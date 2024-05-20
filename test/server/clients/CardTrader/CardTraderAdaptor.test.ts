import * as CardTraderAdaptor from '../../../../src/server/clients/CardTrader/CardTraderAdaptor'
import * as CardTraderClient from '../../../../src/server/clients/CardTrader/CardTraderClient'
import { CardTraderExpansionDto } from '../../../../src/server/clients/CardTrader/types/CardTraderExpansionDto'

const GET_EXPANSIONS = jest.spyOn(CardTraderClient, 'getExpansions')
const POKEMON_SET_ID = CardTraderAdaptor.POKEMON_SET_ID

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
        { code: '', id: Id, name: NAME, gameId: POKEMON_SET_ID },
      ]
      GET_EXPANSIONS.mockResolvedValue(expansionDto)
      const result = await CardTraderAdaptor.getPokemonSets()
      expect(result.length).toEqual(1)
      expect(result[0].id).toEqual(Id)
      expect(result[0].name).toEqual(NAME)
    })
    it('filters out none pokemon set items', async () => {
      const expansionDto: CardTraderExpansionDto[] = [
        { code: '', id: 0, name: '', gameId: POKEMON_SET_ID },
        { code: '', id: 0, name: '', gameId: 1 },
        { code: '', id: 0, name: '', gameId: POKEMON_SET_ID },
        { code: '', id: 0, name: '', gameId: 2 },
        { code: '', id: 0, name: '', gameId: POKEMON_SET_ID },
        { code: '', id: 0, name: '', gameId: 6 },
      ]
      GET_EXPANSIONS.mockResolvedValue(expansionDto)
      const result = await CardTraderAdaptor.getPokemonSets()
      expect(result.length).toEqual(3)
    })
  })
})
