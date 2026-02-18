/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { prisma } from '../../../prisma/prismaClient'
import ExpansionPokemonRepo, { CreateExpansionPokemonEntity } from '../../../src/server/repository/ExpansionPokemonRepo'

jest.mock('../../../prisma/prismaClient', () => ({
  prisma: {
    expansionPlatformLink: { findFirst: jest.fn() },
    game: { findUnique: jest.fn() },
    $transaction: jest.fn(),
  },
}))

const FIND_FIRST = prisma.expansionPlatformLink.findFirst as jest.Mock
const FIND_GAME = prisma.game.findUnique as jest.Mock
const TRANSACTION = prisma.$transaction as jest.Mock

describe('ExpansionPokemonRepo', () => {
  let repo: ExpansionPokemonRepo

  beforeEach(() => {
    jest.clearAllMocks()
    repo = new ExpansionPokemonRepo()
  })

  describe('find', () => {
    const CARD_TRADER_EXPANSION_ID = 200

    it('should return null when platform link is not found', async () => {
      FIND_FIRST.mockResolvedValue(null)

      const result = await repo.find(CARD_TRADER_EXPANSION_ID)

      expect(result).toBeNull()
    })

    it('should return null when pokemonExpansion is missing', async () => {
      FIND_FIRST.mockResolvedValue({
        expansion: {
          id: 1,
          name: 'Base Set',
          imageUrl: 'logo-url',
          numberOfCards: 102,
          releaseDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          pokemonExpansion: null,
        },
      })

      const result = await repo.find(CARD_TRADER_EXPANSION_ID)

      expect(result).toBeNull()
    })

    it('should return a mapped entity when platform link and pokemon expansion exist', async () => {
      const releaseDate = new Date('1999-01-09')
      const createdAt = new Date('2024-01-01')
      const updatedAt = new Date('2024-01-02')

      FIND_FIRST.mockResolvedValue({
        expansion: {
          id: 10,
          name: 'Base Set',
          imageUrl: 'logo-url',
          numberOfCards: 102,
          releaseDate,
          createdAt,
          updatedAt,
          pokemonExpansion: {
            expansionNumberInSeries: 1,
            series: 'Original Series',
            expansionType: 'Main Series Expansion',
            numberOfSecretCards: 0,
            abbreviation: 'BS',
            symbolUrl: 'symbol-url',
            bulbapediaUrl: 'bulbapedia-url',
          },
        },
      })

      const result = await repo.find(CARD_TRADER_EXPANSION_ID)

      expect(result).toEqual({
        id: 10,
        cardTraderExpansionId: CARD_TRADER_EXPANSION_ID,
        name: 'Base Set',
        expansionNumberInSeries: 1,
        series: 'Original Series',
        expansionType: 'Main Series Expansion',
        numberOfCards: 102,
        numberOfSecretCards: 0,
        releaseDate,
        abbreviation: 'BS',
        symbolUrl: 'symbol-url',
        logoUrl: 'logo-url',
        bulbapediaUrl: 'bulbapedia-url',
        createdAt,
        updatedAt,
      })
    })

    it('should map empty symbolUrl to null', async () => {
      FIND_FIRST.mockResolvedValue({
        expansion: {
          id: 1,
          name: 'Base Set',
          imageUrl: '',
          numberOfCards: 102,
          releaseDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          pokemonExpansion: {
            expansionNumberInSeries: 1,
            series: 'Original Series',
            expansionType: 'Main Series Expansion',
            numberOfSecretCards: 0,
            abbreviation: 'BS',
            symbolUrl: '',
            bulbapediaUrl: 'bulbapedia-url',
          },
        },
      })

      const result = await repo.find(CARD_TRADER_EXPANSION_ID)

      expect(result?.symbolUrl).toBeNull()
      expect(result?.logoUrl).toBeNull()
    })
  })

  describe('create', () => {
    const entity: CreateExpansionPokemonEntity = {
      cardTraderExpansionId: 200,
      name: 'Base Set',
      expansionNumberInSeries: 1,
      series: 'Original Series',
      expansionType: 'Main Series Expansion',
      numberOfCards: 102,
      numberOfSecretCards: 0,
      releaseDate: new Date('1999-01-09'),
      abbreviation: 'BS',
      symbolUrl: 'symbol-url',
      logoUrl: 'logo-url',
      bulbapediaUrl: 'bulbapedia-url',
    }

    const GAME_ID = 7
    const EXPANSION_ID = 15

    const mockTx = {
      expansion: { create: jest.fn() },
      expansionPokemon: { create: jest.fn() },
      expansionPlatformLink: { create: jest.fn() },
    }

    beforeEach(() => {
      FIND_GAME.mockResolvedValue({ id: GAME_ID })
      mockTx.expansion.create.mockResolvedValue({ id: EXPANSION_ID })
      TRANSACTION.mockImplementation((fn: any) => fn(mockTx))
    })

    it('should throw when the Pokemon game is not found', async () => {
      FIND_GAME.mockResolvedValue(null)

      await expect(repo.create(entity)).rejects.toThrow('Pokemon game not found')
    })

    it('should return the created expansion id', async () => {
      const result = await repo.create(entity)

      expect(result).toBe(EXPANSION_ID)
    })

    it('should create expansion with the correct data including game id', async () => {
      await repo.create(entity)

      expect(mockTx.expansion.create).toHaveBeenCalledWith({
        data: {
          gameId: GAME_ID,
          name: entity.name,
          imageUrl: entity.logoUrl,
          numberOfCards: entity.numberOfCards,
          releaseDate: entity.releaseDate,
        },
      })
    })

    it('should create pokemon expansion with the correct data', async () => {
      await repo.create(entity)

      expect(mockTx.expansionPokemon.create).toHaveBeenCalledWith({
        data: {
          expansionId: EXPANSION_ID,
          abbreviation: entity.abbreviation,
          series: entity.series,
          expansionType: entity.expansionType,
          expansionNumberInSeries: entity.expansionNumberInSeries,
          numberOfSecretCards: entity.numberOfSecretCards,
          symbolUrl: entity.symbolUrl,
          bulbapediaUrl: entity.bulbapediaUrl,
        },
      })
    })

    it('should create platform link with CARD_TRADER platform and stringified expansion id', async () => {
      await repo.create(entity)

      expect(mockTx.expansionPlatformLink.create).toHaveBeenCalledWith({
        data: {
          expansionId: EXPANSION_ID,
          platform: 'CARD_TRADER',
          externalId: String(entity.cardTraderExpansionId),
        },
      })
    })
  })
})
