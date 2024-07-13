import { CardDto } from './CardDto'
import { MyCollectionDetailsDto } from './MyCollectionDetailsDto'

export type CollectionDto = {
  details: MyCollectionDetailsDto
  cards: CardDto[]
}
