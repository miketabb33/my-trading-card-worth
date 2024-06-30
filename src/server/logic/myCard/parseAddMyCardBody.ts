import TypeParser from '../../../core/TypeParser'
import { MyCardDto } from '../../../core/types/MyCardDto'

export const tryToParseAddMyCardBody = (body: unknown): MyCardDto => {
  const typeParser = new TypeParser(body, 'Add my card body')

  return {
    cardTraderBlueprintId: typeParser.num('cardTraderBlueprintId'),
    cardTraderExpansionId: typeParser.num('cardTraderExpansionId'),
    name: typeParser.str('name'),
    condition: typeParser.num('condition'),
    imageUrlPreview: typeParser.str('imageUrlPreview'),
    imageUrlShow: typeParser.str('imageUrlShow'),
  }
}
