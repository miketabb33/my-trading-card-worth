import * as CardTraderAdaptor from '../../../../src/server/clients/CardTrader/CardTraderAdaptor'
import * as CardTraderClient from '../../../../src/server/clients/CardTrader/CardTraderClient'
import {
  CARD_TRADER_BASE_URL,
  POKEMON_GAME_ID,
  POKEMON_SINGLE_CARD_CATEGORY,
} from '../../../../src/server/clients/CardTrader/CardTraderConfig'
import { CardTraderBlueprintDto } from '../../../../src/server/clients/CardTrader/types/CardTraderBlueprintDto'
import { CardTraderExpansionDto } from '../../../../src/server/clients/CardTrader/types/CardTraderExpansionDto'
import { makeBlueprintDto } from './__MOCKS__/CardTraderBlueprintDto.mock'

const GET_EXPANSIONS = jest.spyOn(CardTraderClient, 'getExpansions')
const GET_BLUEPRINTS = jest.spyOn(CardTraderClient, 'getBlueprints')

beforeEach(jest.clearAllMocks)

describe('Card Trader Adaptor', () => {
  describe('Get Pokemon Sets', () => {
    it('return empty array when given empty array', async () => {
      const expansionDto: CardTraderExpansionDto[] = []
      GET_EXPANSIONS.mockResolvedValue(expansionDto)
      const result = await CardTraderAdaptor.getPokemonSets()
      expect(result.length).toEqual(0)
    })
    it('formats pokemon set object correctly', async () => {
      const Id = 1234
      const NAME = 'Jungle'
      const expansionDto: CardTraderExpansionDto[] = [
        { code: '', id: Id, name: NAME, gameId: POKEMON_GAME_ID },
      ]
      GET_EXPANSIONS.mockResolvedValue(expansionDto)
      const result = await CardTraderAdaptor.getPokemonSets()
      expect(result.length).toEqual(1)
      expect(result[0].id).toEqual(Id)
      expect(result[0].name).toEqual(NAME)
    })
    it('filters out none pokemon set items', async () => {
      const expansionDto: CardTraderExpansionDto[] = [
        { code: '', id: 0, name: '', gameId: POKEMON_GAME_ID },
        { code: '', id: 0, name: '', gameId: 1 },
        { code: '', id: 0, name: '', gameId: POKEMON_GAME_ID },
        { code: '', id: 0, name: '', gameId: 2 },
        { code: '', id: 0, name: '', gameId: POKEMON_GAME_ID },
        { code: '', id: 0, name: '', gameId: 6 },
      ]
      GET_EXPANSIONS.mockResolvedValue(expansionDto)
      const result = await CardTraderAdaptor.getPokemonSets()
      expect(result.length).toEqual(3)
    })
  })

  describe('Get Pokemon Set', () => {
    it('return empty array when given empty array', async () => {
      const blueprintDto: CardTraderBlueprintDto[] = []
      const id = 3
      GET_BLUEPRINTS.mockResolvedValue(blueprintDto)
      const result = await CardTraderAdaptor.getPokemonSet(id)
      expect(result.length).toEqual(0)
      expect(GET_BLUEPRINTS).toHaveBeenCalledWith(id)
    })

    it('formats blueprint object correctly', async () => {
      const id = 25
      const name = 'Any name'
      const version = '1/122'
      const imageUrlPreview =
        '/uploads/blueprints/image/111148/preview_alakazam-rare-holo-1-102-base-set.jpg'
      const imageUrlShow =
        '/uploads/blueprints/image/111148/show_alakazam-rare-holo-1-102-base-set.jpg'
      const blueprintDto: CardTraderBlueprintDto[] = [
        makeBlueprintDto({
          id,
          name,
          version,
          imageUrlPreview,
          imageUrlShow,
          categoryId: POKEMON_SINGLE_CARD_CATEGORY,
        }),
      ]

      GET_BLUEPRINTS.mockResolvedValue(blueprintDto)
      const result = await CardTraderAdaptor.getPokemonSet(3)
      expect(result[0].cardTraderId).toEqual(id)
      expect(result[0].name).toEqual(name)
      expect(result[0].version).toEqual(version)
      expect(result[0].imageUrlPreview).toEqual(
        `${CARD_TRADER_BASE_URL}${imageUrlPreview}`
      )
      expect(result[0].imageUrlShow).toEqual(
        `${CARD_TRADER_BASE_URL}${imageUrlShow}`
      )
    })

    it('filters out none single pokemon items', async () => {
      const blueprintDto: CardTraderBlueprintDto[] = [
        makeBlueprintDto({ categoryId: 1 }),
        makeBlueprintDto({ categoryId: POKEMON_SINGLE_CARD_CATEGORY }),
        makeBlueprintDto({ categoryId: 3 }),
        makeBlueprintDto({ categoryId: POKEMON_SINGLE_CARD_CATEGORY }),
        makeBlueprintDto({ categoryId: 5 }),
        makeBlueprintDto({ categoryId: POKEMON_SINGLE_CARD_CATEGORY }),
      ]

      GET_BLUEPRINTS.mockResolvedValue(blueprintDto)
      const result = await CardTraderAdaptor.getPokemonSet(3)
      expect(result.length).toEqual(3)
    })
  })
})