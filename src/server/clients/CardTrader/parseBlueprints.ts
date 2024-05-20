/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import TypeParser from '../../../TypeParser'
import { CardTraderBlueprintDto } from './types/CardTraderBlueprintDto'

export const tryToParseBlueprints = (
  data: unknown
): CardTraderBlueprintDto[] => {
  const array = TypeParser.rootIsArray(data, tryToParseBlueprints.name)

  return array.map((item) => {
    const parser = new TypeParser(item, tryToParseBlueprints.name)

    const blueprint: CardTraderBlueprintDto = {
      id: parser.num('id'),
      name: parser.str('name'),
      version: parser.strOrNull('version'),
      gameId: parser.num('game_id'),
      categoryId: parser.num('category_id'),
      expansionId: parser.num('expansion_id'),
      imageUrl: parser.str('image_url'),
    }
    return blueprint
  })
}
