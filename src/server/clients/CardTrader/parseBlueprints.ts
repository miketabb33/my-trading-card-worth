/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import TypeParser from '../../../core/TypeParser'
import { CardTraderBlueprintDto } from './types/CardTraderBlueprintDto'

export const tryToParseBlueprints = (
  data: unknown
): CardTraderBlueprintDto[] => {
  const array = TypeParser.rootIsArray(data, tryToParseBlueprints.name)

  return array.map((item) => {
    const parser = new TypeParser(item, tryToParseBlueprints.name)
    const id = parser.num('id')
    const name = parser.str('name')

    const showUrl = item.image.show.url as string
    const previewUrl = item.image.preview.url as string
    if (!showUrl)
      throw new Error(`Failed to parse ${name} images. Trader Card ID: ${id}`)

    const blueprint: CardTraderBlueprintDto = {
      id,
      name,
      version: parser.strOrNull('version'),
      gameId: parser.num('game_id'),
      categoryId: parser.num('category_id'),
      expansionId: parser.num('expansion_id'),
      image: {
        show: {
          url: showUrl,
        },
        preview: {
          url: previewUrl,
        },
      },
    }
    return blueprint
  })
}
