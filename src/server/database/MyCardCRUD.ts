export type MyCardEntity = {
  userId: string
  cardTraderId: string
  name: string
  condition:
    | 'Near Mint'
    | 'Slightly Played'
    | 'Moderately Played'
    | 'Played'
    | 'Poor'
}
