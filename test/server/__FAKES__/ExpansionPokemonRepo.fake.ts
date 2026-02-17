import { IExpansionPokemonRepo } from '../../../src/server/repository/ExpansionPokemonRepo'

class ExpansionPokemonRepo_FAKE implements IExpansionPokemonRepo {
  FIND = jest.fn()

  find = this.FIND
}

export default ExpansionPokemonRepo_FAKE
