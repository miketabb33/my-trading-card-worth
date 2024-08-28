import { CardDto } from './CardDto'
import { MyCollectionDetailsDto } from './MyCollectionDetailsDto'

export type ShareCollectionDto = {
  details: MyCollectionDetailsDto
  cards: CardDto[]
  name: string
}
