import { ICardTraderAdaptor } from '../../../src/server/clients/CardTrader/CardTraderAdaptor'

class CardTraderAdaptor_FAKE implements ICardTraderAdaptor {
  GET_POKEMON_EXPANSIONS = jest.fn()
  GET_POKEMON_BLUEPRINTS = jest.fn()
  GET_POKEMON_CARD_VALUES = jest.fn()

  getPokemonExpansions = this.GET_POKEMON_EXPANSIONS
  getPokemonBlueprints = this.GET_POKEMON_BLUEPRINTS
  getPokemonCardValues = this.GET_POKEMON_CARD_VALUES
}

export default CardTraderAdaptor_FAKE
