export type CardConditionOptions =
  | 'Unknown'
  | 'Mint'
  | 'Near Mint'
  | 'Slightly Played'
  | 'Moderately Played'
  | 'Played'
  | 'Heavily Played'
  | 'Poor'

export type CardCondition = {
  id: number
  option: CardConditionOptions
}

const Unknown: CardCondition = { id: 0, option: 'Unknown' }
const Mint: CardCondition = { id: 1, option: 'Mint' }
const NearMint: CardCondition = { id: 2, option: 'Near Mint' }
const SlightlyPlayed: CardCondition = { id: 3, option: 'Slightly Played' }
const ModeratelyPlayed: CardCondition = {
  id: 4,
  option: 'Moderately Played',
}
const Played: CardCondition = { id: 5, option: 'Played' }
const HeavilyPlayed: CardCondition = { id: 6, option: 'Heavily Played' }
const Poor: CardCondition = { id: 7, option: 'Poor' }

export const CardConditions = {
  Unknown,
  Mint,
  NearMint,
  SlightlyPlayed,
  ModeratelyPlayed,
  Played,
  Poor,
  Damaged: HeavilyPlayed,
  asArray: [Unknown, Mint, NearMint, SlightlyPlayed, ModeratelyPlayed, Played, Poor, HeavilyPlayed],
}

CardConditions
