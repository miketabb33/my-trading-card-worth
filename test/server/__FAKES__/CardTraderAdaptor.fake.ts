import { ICardTraderAdaptor } from '../../../src/server/clients/CardTrader/CardTraderAdaptor'

class CardTraderAdaptor_FAKE implements ICardTraderAdaptor {
  GET_POKEMON_SETS = jest.fn()
  GET_POKEMON_SET_BLUEPRINTS = jest.fn()
  GET_POKEMON_CARD_VALUES = jest.fn()

  getPokemonSets = this.GET_POKEMON_SETS
  getPokemonSetBlueprints = this.GET_POKEMON_SET_BLUEPRINTS
  getPokemonCardValues = this.GET_POKEMON_CARD_VALUES
}

export default CardTraderAdaptor_FAKE
