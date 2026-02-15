/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongoose from 'mongoose'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const expansionSchema = new mongoose.Schema(
  {
    cardTraderExpansionId: Number,
    name: String,
    expansionNumberInSeries: Number,
    series: String,
    expansionType: String,
    numberOfCards: Number,
    numberOfSecretCards: Number,
    releaseDate: Date,
    abbreviation: String,
    symbolUrl: String,
    logoUrl: String,
    bulbapediaUrl: String,
  },
  { timestamps: true }
)

const MongoExpansion = mongoose.model('expansion', expansionSchema)

const profileSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    nickname: String,
    email: String,
    picture: String,
  },
  { timestamps: true }
)

const MongoProfile = mongoose.model('profile', profileSchema)

const expansionOrderSchema = new mongoose.Schema(
  {
    mainSeries: Array,
    otherSeries: Array,
  },
  { timestamps: true }
)

const MongoExpansionOrder = mongoose.model('expansion_order', expansionOrderSchema)

const backfillExpansions = async (pokemonGameId: number) => {
  const mongoExpansions = await MongoExpansion.find()
  console.log(`Found ${mongoExpansions.length} expansions in Mongo`)

  for (const exp of mongoExpansions) {
    const existing = await prisma.expansionPlatformLink.findFirst({
      where: {
        platform: 'CARD_TRADER',
        externalId: String(exp.cardTraderExpansionId),
      },
    })

    if (existing) {
      console.log(`Skipping expansion "${exp.name}" — already exists`)
      continue
    }

    const expansion = await prisma.expansion.create({
      data: {
        gameId: pokemonGameId,
        name: exp.name || '',
        imageUrl: exp.logoUrl || '',
        numberOfCards: exp.numberOfCards || 0,
        releaseDate: exp.releaseDate || new Date(),
      },
    })

    await prisma.expansionPokemon.create({
      data: {
        expansionId: expansion.id,
        abbreviation: exp.abbreviation || '',
        series: exp.series || '',
        expansionType: exp.expansionType || '',
        expansionNumberInSeries: exp.expansionNumberInSeries || 0,
        numberOfSecretCards: exp.numberOfSecretCards || 0,
        symbolUrl: exp.symbolUrl || '',
        bulbapediaUrl: exp.bulbapediaUrl || '',
      },
    })

    await prisma.expansionPlatformLink.create({
      data: {
        expansionId: expansion.id,
        platform: 'CARD_TRADER',
        externalId: String(exp.cardTraderExpansionId),
      },
    })

    console.log(`Migrated expansion "${exp.name}"`)
  }
}

const backfillExpansionOrder = async () => {
  const existing = await prisma.expansionPokemonOrder.findFirst()
  if (existing) {
    console.log('Skipping expansion order — already exists')
    return
  }

  const mongoOrders = await MongoExpansionOrder.find()
  if (!mongoOrders[0]) {
    console.log('No expansion order found in Mongo')
    return
  }

  await prisma.expansionPokemonOrder.create({
    data: {
      mainSeries: mongoOrders[0].mainSeries,
      otherSeries: mongoOrders[0].otherSeries,
    },
  })

  console.log('Migrated expansion order')
}

const backfillProfiles = async () => {
  const mongoProfiles = await MongoProfile.find()
  console.log(`Found ${mongoProfiles.length} profiles in Mongo`)

  for (const prof of mongoProfiles) {
    if (!prof.userId) {
      console.log(`Skipping profile — no userId`)
      continue
    }

    const existing = await prisma.profile.findUnique({
      where: { userId: prof.userId },
    })

    if (existing) {
      console.log(`Skipping profile "${prof.email}" — already exists`)
      continue
    }

    await prisma.profile.create({
      data: {
        userId: prof.userId,
        email: prof.email || '',
        name: prof.name || '',
        nickname: prof.nickname || '',
        picture: prof.picture || '',
      },
    })

    console.log(`Migrated profile "${prof.email}"`)
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

  const pokemonGame = await prisma.game.upsert({
    where: { name: 'Pokemon' },
    update: {},
    create: { name: 'Pokemon' },
  })
  console.log(`Game "Pokemon" ready (id: ${pokemonGame.id})`)

  await backfillExpansions(pokemonGame.id)
  await backfillExpansionOrder()
  await backfillProfiles()

  await mongoose.disconnect()
  await prisma.$disconnect()
  console.log('Backfill complete')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
