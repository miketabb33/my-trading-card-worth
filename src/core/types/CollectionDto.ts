import { CardDto } from './CardDto'
import { CollectionMetaDto } from './CollectionMetaDto'

export type CollectionDto = {
  meta: CollectionMetaDto
  cards: CardDto[]
}
