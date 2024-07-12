import { CardDto } from './CardDto'

export type SetDto = {
  details: SetDetailsDto | null
  blueprints: CardDto[]
}

export type SetDetailsDto = {
  name: string
  setNumber: number
  series: string
  cardCount: number
  secretCardCount: number
  releaseDate: string
  logoUrl: string | null
  symbolUrl: string | null
  bulbapediaUrl: string
}
