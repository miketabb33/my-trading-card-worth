import TypeParser from '../../../core/TypeParser'
import { AddMyCardDto } from '../../../core/types/AddMyCardDto'

export const parseAddMyCardBody = (body: unknown): AddMyCardDto => {
  const typeParser = new TypeParser(body, 'Add my card body')

  return {
    blueprintId: typeParser.num('blueprintId'),
    expansionId: typeParser.num('expansionId'),
    name: typeParser.str('name'),
    imageUrlPreview: typeParser.str('imageUrlPreview'),
    imageUrlShow: typeParser.str('imageUrlShow'),
  }
}
