import { CardCondition } from '@prisma/client'
import AddCardTraderCardLogic from '../../../../src/server/logic/collection/AddCardTraderCardLogic'
import CardTraderAdaptor_FAKE from '../../__FAKES__/CardTraderAdaptor.fake'
import ExpansionPokemonRepo_FAKE from '../../__FAKES__/ExpansionPokemonRepo.fake'
import CardBlueprintPokemonRepo_FAKE from '../../__FAKES__/CardBlueprintPokemonRepo.fake'
import { makePrismaClientMock } from '../../__MOCKS__/prismaClient.mock'
import { EXPANSION_ENTITY_ORIGINAL } from '../../__MOCKS__/expansionEntity.mock'
import { makeCardBlueprintMock } from '../../__MOCKS__/cardBlueprint.mock'

const mockPrisma = makePrismaClientMock({
  cardBlueprintPlatformLink: { findFirst: jest.fn() },
  userCard: { create: jest.fn() },
})

describe('Add Card Trader Card Logic', () => {
  let logic: AddCardTraderCardLogic
  let cardTraderAdaptor_FAKE: CardTraderAdaptor_FAKE
  let expansionPokemonRepo_FAKE: ExpansionPokemonRepo_FAKE
  let cardBlueprintPokemonRepo_FAKE: CardBlueprintPokemonRepo_FAKE

  const PROFILE_ID = 1
  const CARD_TRADER_BLUEPRINT_ID = 100
  const CARD_TRADER_EXPANSION_ID = 200
  const CONDITION: CardCondition = 'NEAR_MINT'
  const EXPANSION_ID = 42
  const CARD_BLUEPRINT_ID = 99

  beforeEach(() => {
    jest.clearAllMocks()
    cardTraderAdaptor_FAKE = new CardTraderAdaptor_FAKE()
    expansionPokemonRepo_FAKE = new ExpansionPokemonRepo_FAKE()
    cardBlueprintPokemonRepo_FAKE = new CardBlueprintPokemonRepo_FAKE()
    logic = new AddCardTraderCardLogic(
      mockPrisma,
      cardTraderAdaptor_FAKE,
      expansionPokemonRepo_FAKE,
      cardBlueprintPokemonRepo_FAKE
    )
  })

  const setupHappyPath = () => {
    expansionPokemonRepo_FAKE.FIND.mockResolvedValue({ ...EXPANSION_ENTITY_ORIGINAL, id: EXPANSION_ID })
    cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([
      makeCardBlueprintMock({ blueprintId: CARD_TRADER_BLUEPRINT_ID }),
    ])
    cardBlueprintPokemonRepo_FAKE.FIND.mockResolvedValue({})
    mockPrisma.cardBlueprintPlatformLink.findFirst.mockResolvedValue({ cardBlueprintId: CARD_BLUEPRINT_ID })
  }

  it('should create a user card with the correct data', async () => {
    setupHappyPath()

    await logic.add(PROFILE_ID, CARD_TRADER_BLUEPRINT_ID, CARD_TRADER_EXPANSION_ID, CONDITION)

    expect(mockPrisma.userCard.create).toHaveBeenCalledWith({
      data: {
        profileId: PROFILE_ID,
        cardBlueprintId: CARD_BLUEPRINT_ID,
        condition: CONDITION,
      },
    })
  })

  it('should not create expansion when it already exists', async () => {
    setupHappyPath()

    await logic.add(PROFILE_ID, CARD_TRADER_BLUEPRINT_ID, CARD_TRADER_EXPANSION_ID, CONDITION)

    expect(expansionPokemonRepo_FAKE.FIND).toHaveBeenCalledWith(CARD_TRADER_EXPANSION_ID)
    expect(expansionPokemonRepo_FAKE.CREATE).not.toHaveBeenCalled()
  })

  it('should fetch and create expansion when it does not exist', async () => {
    expansionPokemonRepo_FAKE.FIND.mockResolvedValue(null)
    expansionPokemonRepo_FAKE.CREATE.mockResolvedValue(EXPANSION_ID)
    cardTraderAdaptor_FAKE.GET_POKEMON_EXPANSIONS.mockResolvedValue([
      { expansionId: CARD_TRADER_EXPANSION_ID, name: 'Base Set' },
    ])
    cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([
      makeCardBlueprintMock({ blueprintId: CARD_TRADER_BLUEPRINT_ID }),
    ])
    cardBlueprintPokemonRepo_FAKE.FIND.mockResolvedValue({})
    mockPrisma.cardBlueprintPlatformLink.findFirst.mockResolvedValue({ cardBlueprintId: CARD_BLUEPRINT_ID })

    await logic.add(PROFILE_ID, CARD_TRADER_BLUEPRINT_ID, CARD_TRADER_EXPANSION_ID, CONDITION)

    expect(expansionPokemonRepo_FAKE.CREATE).toHaveBeenCalledWith(
      expect.objectContaining({
        cardTraderExpansionId: CARD_TRADER_EXPANSION_ID,
        name: 'Base Set',
      })
    )
  })

  it('should use empty string for expansion name when not matched in card trader response', async () => {
    expansionPokemonRepo_FAKE.FIND.mockResolvedValue(null)
    expansionPokemonRepo_FAKE.CREATE.mockResolvedValue(EXPANSION_ID)
    cardTraderAdaptor_FAKE.GET_POKEMON_EXPANSIONS.mockResolvedValue([])
    cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([
      makeCardBlueprintMock({ blueprintId: CARD_TRADER_BLUEPRINT_ID }),
    ])
    cardBlueprintPokemonRepo_FAKE.FIND.mockResolvedValue({})
    mockPrisma.cardBlueprintPlatformLink.findFirst.mockResolvedValue({ cardBlueprintId: CARD_BLUEPRINT_ID })

    await logic.add(PROFILE_ID, CARD_TRADER_BLUEPRINT_ID, CARD_TRADER_EXPANSION_ID, CONDITION)

    expect(expansionPokemonRepo_FAKE.CREATE).toHaveBeenCalledWith(expect.objectContaining({ name: '' }))
  })

  it('should create blueprint when it does not exist', async () => {
    const blueprint = makeCardBlueprintMock({ blueprintId: CARD_TRADER_BLUEPRINT_ID })
    expansionPokemonRepo_FAKE.FIND.mockResolvedValue({ ...EXPANSION_ENTITY_ORIGINAL, id: EXPANSION_ID })
    cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([blueprint])
    cardBlueprintPokemonRepo_FAKE.FIND.mockResolvedValue(null)
    mockPrisma.cardBlueprintPlatformLink.findFirst.mockResolvedValue({ cardBlueprintId: CARD_BLUEPRINT_ID })

    await logic.add(PROFILE_ID, CARD_TRADER_BLUEPRINT_ID, CARD_TRADER_EXPANSION_ID, CONDITION)

    expect(cardBlueprintPokemonRepo_FAKE.CREATE).toHaveBeenCalledWith({
      expansionId: EXPANSION_ID,
      cardTraderBlueprintId: blueprint.blueprintId,
      name: blueprint.name,
      collectorNumber: blueprint.collectorNumber,
      rarity: blueprint.pokemonRarity,
      imageShowUrl: blueprint.imageUrlShow,
      imagePreviewUrl: blueprint.imageUrlPreview,
    })
  })

  it('should skip creating blueprint when it already exists', async () => {
    setupHappyPath()

    await logic.add(PROFILE_ID, CARD_TRADER_BLUEPRINT_ID, CARD_TRADER_EXPANSION_ID, CONDITION)

    expect(cardBlueprintPokemonRepo_FAKE.CREATE).not.toHaveBeenCalled()
  })

  it('should throw when blueprint platform link is not found', async () => {
    expansionPokemonRepo_FAKE.FIND.mockResolvedValue({ ...EXPANSION_ENTITY_ORIGINAL, id: EXPANSION_ID })
    cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([
      makeCardBlueprintMock({ blueprintId: CARD_TRADER_BLUEPRINT_ID }),
    ])
    cardBlueprintPokemonRepo_FAKE.FIND.mockResolvedValue({})
    mockPrisma.cardBlueprintPlatformLink.findFirst.mockResolvedValue(null)

    await expect(logic.add(PROFILE_ID, CARD_TRADER_BLUEPRINT_ID, CARD_TRADER_EXPANSION_ID, CONDITION)).rejects.toThrow(
      `Card blueprint not found for CardTrader blueprint ID: ${CARD_TRADER_BLUEPRINT_ID}`
    )
  })

  it('should look up the platform link with CARD_TRADER platform and stringified blueprint id', async () => {
    setupHappyPath()

    await logic.add(PROFILE_ID, CARD_TRADER_BLUEPRINT_ID, CARD_TRADER_EXPANSION_ID, CONDITION)

    expect(mockPrisma.cardBlueprintPlatformLink.findFirst).toHaveBeenCalledWith({
      where: {
        platform: 'CARD_TRADER',
        externalId: String(CARD_TRADER_BLUEPRINT_ID),
      },
    })
  })
})
