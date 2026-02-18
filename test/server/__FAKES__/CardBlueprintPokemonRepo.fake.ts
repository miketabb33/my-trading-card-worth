import { ICardBlueprintPokemonRepo } from '../../../src/server/repository/CardBlueprintPokemonRepo'

class CardBlueprintPokemonRepo_FAKE implements ICardBlueprintPokemonRepo {
  FIND = jest.fn()
  CREATE = jest.fn()

  find = this.FIND
  create = this.CREATE
}

export default CardBlueprintPokemonRepo_FAKE
