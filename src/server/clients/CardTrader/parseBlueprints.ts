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

    const [showUrl, previewUrl] = parseImageUrls(item)

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

const parseImageUrls = (item: any): [string, string] => {
  if (!item.image) return ['', '']

  let showUrl = ''
  let previewUrl = ''

  if (item.image.show && item.image.show.url) showUrl = item.image.show.url
  if (item.image.preview && item.image.preview.url)
    previewUrl = item.image.preview.url

  return [showUrl, previewUrl]
}
