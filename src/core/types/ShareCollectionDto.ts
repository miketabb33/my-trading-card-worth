import { CardDto } from './CardDto'
import { CollectionMetaDto } from './CollectionMetaDto'

export type ShareCollectionDto = {
  meta: CollectionMetaDto
  cards: CardDto[]
  name: string
}
