/* eslint-disable @typescript-eslint/no-unused-vars */
import TypeParser from '../../../core/TypeParser'
import { CardTraderExpansionDto } from './types/CardTraderExpansionDto'

export const tryToParseExpansions = (
  data: unknown
): CardTraderExpansionDto[] => {
  const array = TypeParser.rootIsArray(data, tryToParseExpansions.name)
  return array.map((item) => {
    const parser = new TypeParser(item, tryToParseExpansions.name)
    return {
      id: parser.num('id'),
      gameId: parser.num('game_id'),
      code: parser.str('code'),
      name: parser.str('name'),
    }
  })
}
