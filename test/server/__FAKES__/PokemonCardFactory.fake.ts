import { IPokemonCardFactory } from '../../../src/server/domain/PokemonCardFactory'

class PokemonCardFactory_FAKE implements IPokemonCardFactory {
  FROM_POSTGRES = jest.fn()
  FROM_CARD_TRADER = jest.fn()

  fromPostgres = this.FROM_POSTGRES
  fromCardTrader = this.FROM_CARD_TRADER
}

export default PokemonCardFactory_FAKE
