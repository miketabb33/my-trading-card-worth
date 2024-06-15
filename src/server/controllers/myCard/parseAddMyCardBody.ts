import TypeParser from '../../../core/TypeParser'
import { MyCardDto } from '../../../core/types/MyCardDto'

export const tryToParseAddMyCardBody = (body: unknown): MyCardDto => {
  const typeParser = new TypeParser(body, 'Add my card body')

  return {
    cardTraderBlueprintId: typeParser.num('cardTraderBlueprintId'),
    name: typeParser.str('name'),
    condition: typeParser.num('condition'),
  }
}
