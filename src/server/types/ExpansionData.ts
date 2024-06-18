type ExpansionType = 'Main Series Expansion'

export type ExpansionData = {
  name: string
  setNumber: number
  series: string
  expansionType: ExpansionType
  numberOfCards: number
  numberOfSecretCards: number
  releaseDate: string
  abbreviation: string
  symbolUrl: string | null
  logoUrl: string | null
  bulbapediaUrl: string
}
