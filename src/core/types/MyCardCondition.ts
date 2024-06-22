export type CardCondition =
  | 'Unknown'
  | 'Mint'
  | 'Near Mint'
  | 'Slightly Played'
  | 'Moderately Played'
  | 'Played'
  | 'Heavily Played'
  | 'Poor'

export type MyCardConditionType = {
  id: number
  title: CardCondition
}

const Unknown: MyCardConditionType = { id: 0, title: 'Unknown' }
const Mint: MyCardConditionType = { id: 1, title: 'Mint' }
const NearMint: MyCardConditionType = { id: 2, title: 'Near Mint' }
const SlightlyPlayed: MyCardConditionType = { id: 3, title: 'Slightly Played' }
const ModeratelyPlayed: MyCardConditionType = {
  id: 4,
  title: 'Moderately Played',
}
const Played: MyCardConditionType = { id: 5, title: 'Played' }
const HeavilyPlayed: MyCardConditionType = { id: 6, title: 'Heavily Played' }
const Poor: MyCardConditionType = { id: 7, title: 'Poor' }

export const MyCardCondition = {
  Unknown,
  Mint,
  NearMint,
  SlightlyPlayed,
  ModeratelyPlayed,
  Played,
  Poor,
  Damaged: HeavilyPlayed,
  asArray: [
    Unknown,
    Mint,
    NearMint,
    SlightlyPlayed,
    ModeratelyPlayed,
    Played,
    Poor,
    HeavilyPlayed,
  ],
}

MyCardCondition
