/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongoose from 'mongoose'
import { PrismaClient } from '@prisma/client'
import AddCardTraderCardLogic from '../../src/server/logic/collection/AddCardTraderCardLogic'
import CardTraderAdaptor from '../../src/server/clients/CardTrader/CardTraderAdaptor'
import ExpansionPokemonRepo from '../../src/server/repository/ExpansionPokemonRepo'
import CardBlueprintPokemonRepo from '../../src/server/repository/CardBlueprintPokemonRepo'

const prisma = new PrismaClient()

const myCardSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    items: [
      {
        condition: Number,
      },
    ],
    imageUrlPreview: String,
    imageUrlShow: String,
    cardTrader: {
      blueprintId: Number,
      expansionId: Number,
    },
  },
  { timestamps: true }
)

const MongoMyCard = mongoose.model('my_card', myCardSchema)

const backfillUserCards = async () => {
  const addCardTraderCardLogic = new AddCardTraderCardLogic(
    prisma,
    new CardTraderAdaptor(),
    new ExpansionPokemonRepo(),
    new CardBlueprintPokemonRepo()
  )

  const myCards = await MongoMyCard.find()
  console.log(`Found ${myCards.length} my_card documents in Mongo`)

  for (const myCard of myCards) {
    try {
      const userId = myCard.userId
      if (!userId) {
        console.log(`Skipping my_card — no userId`)
        continue
      }

      const profile = await prisma.profile.findUnique({ where: { userId } })
      if (!profile) {
        console.log(`Skipping my_card for userId "${userId}" — no profile found`)
        continue
      }

      const blueprintId = myCard.cardTrader?.blueprintId
      const expansionId = myCard.cardTrader?.expansionId

      if (!blueprintId || !expansionId) {
        console.log(`Skipping my_card for userId "${userId}" — missing cardTrader data`)
        continue
      }

      const itemCount = myCard.items?.length ?? 0

      // Idempotency: check how many userCards already exist for this profile + blueprint
      const existingPlatformLink = await prisma.cardBlueprintPlatformLink.findFirst({
        where: { platform: 'CARD_TRADER', externalId: String(blueprintId) },
      })

      let existingCount = 0
      if (existingPlatformLink) {
        existingCount = await prisma.userCard.count({
          where: { profileId: profile.id, cardBlueprintId: existingPlatformLink.cardBlueprintId },
        })
      }

      const cardsToCreate = Math.max(0, itemCount - existingCount)

      if (cardsToCreate === 0) {
        console.log(`Skipping "${myCard.name}" for userId "${userId}" — already fully migrated`)
        continue
      }

      if (existingPlatformLink) {
        // Blueprint already set up — create remaining userCards directly, no API calls
        for (let i = 0; i < cardsToCreate; i++) {
          await prisma.userCard.create({
            data: {
              profileId: profile.id,
              cardBlueprintId: existingPlatformLink.cardBlueprintId,
              condition: 'UNKNOWN',
            },
          })
        }
      } else {
        // Blueprint not yet set up — call add() once to handle expansion/blueprint setup + first userCard
        await addCardTraderCardLogic.add(profile.id, blueprintId, expansionId, 'UNKNOWN')

        // Create remaining copies directly, skipping the CardTrader API
        if (cardsToCreate > 1) {
          const platformLink = await prisma.cardBlueprintPlatformLink.findFirst({
            where: { platform: 'CARD_TRADER', externalId: String(blueprintId) },
          })

          for (let i = 1; i < cardsToCreate; i++) {
            await prisma.userCard.create({
              data: {
                profileId: profile.id,
                cardBlueprintId: platformLink!.cardBlueprintId,
                condition: 'UNKNOWN',
              },
            })
          }
        }
      }

      console.log(`Migrated ${cardsToCreate} card(s) for "${myCard.name}" (userId: ${userId})`)
    } catch (e) {
      console.error(`Failed to migrate "${myCard.name}" (userId: ${myCard.userId}):`, e)
    }
  }
}

const run = async () => {
  const mongoUrl = process.env.MONGODB_CONNECTION_STRING
  if (!mongoUrl) {
    console.error('MONGODB_CONNECTION_STRING env var is required')
    process.exit(1)
  }

  await mongoose.connect(mongoUrl)
  console.log('Connected to MongoDB')

  await backfillUserCards()

  await mongoose.disconnect()
  await prisma.$disconnect()
  console.log('Backfill complete')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
