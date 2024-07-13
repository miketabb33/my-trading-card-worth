export type ExpansionData = {
  name: string
  expansionNumberInSeries: number
  series: ExpansionSeries
  expansionType: ExpansionType
  numberOfCards: number
  numberOfSecretCards: number
  releaseDate: string
  abbreviation: string
  symbolUrl: string | null
  logoUrl: string | null
  bulbapediaUrl: string
}

type ExpansionType =
  | 'Main Series Expansion'
  | 'Special Expansion'
  | 'Other Expansion'

export type ExpansionSeries =
  | 'Original Series'
  | 'Neo Series'
  | 'Legendary Collection Series'
  | 'e-Card Series'
  | 'EX Series'
  | 'Diamond & Pearl Series'
  | 'Platinum Series'
  | 'HeartGold & SoulSilver Series'
  | 'Call of Legends Series'
  | 'Black & White Series'
  | 'XY Series'
  | 'Sun & Moon Series'
  | 'Sword & Shield Series'
  | 'Scarlet & Violet Series'
  | 'Black Star Promotional Cards'
  | "McDonald's Collection"
  | 'Trick or Trade'
  | 'Pop / Play! Pokemon Prize Packs'
  | 'Other Miscellaneous Sets'
