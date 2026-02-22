import { UserCardWithBlueprint } from '../repository/UserCardRepo'

class UserCardStack {
  constructor(private cards: UserCardWithBlueprint[]) {}

  filter(cardTraderId: number): UserCardWithBlueprint[] {
    return this.cards.filter((card) =>
      card.cardBlueprint.platformLinks.some(
        (link) => link.platform === 'CARD_TRADER' && Number(link.externalId) === cardTraderId
      )
    )
  }
}

export default UserCardStack
