import TypeParser from '../../../core/TypeParser'
import { MyCardDto } from '../../../core/types/MyCardDto'

export const tryToParseAddMyCardBody = (body: unknown): MyCardDto => {
  const typeParser = new TypeParser(body, 'Add my card body')

  return {
    cardTraderId: typeParser.num('cardTraderId'),
    name: typeParser.str('name'),
    condition: typeParser.num('condition'),
  }
}
