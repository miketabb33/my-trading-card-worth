import { CardDto } from './CardDto'
import { ExpansionDetailsDto } from './ExpansionDetailsDto'

export type CatalogDto = {
  details: ExpansionDetailsDto | null
  cards: CardDto[]
}
