import { IExpansionPokemonRepo } from '../../../src/server/repository/ExpansionPokemonRepo'

class ExpansionPokemonRepo_FAKE implements IExpansionPokemonRepo {
  FIND = jest.fn()
  CREATE = jest.fn()

  find = this.FIND
  create = this.CREATE
}

export default ExpansionPokemonRepo_FAKE
