import { CatalogDto, ExpansionDetailsDto, ExpansionPriceDetailsDto } from '@core/network-types/catalog'
import { CardDto } from '@core/network-types/card'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IUserCardRepo } from '../../repository/UserCardRepo'
import { BlueprintValue } from '../../types/BlueprintValue'
import { CardBlueprint } from '../../types/CardBlueprint'
import { ExpansionPokemonEntity, IExpansionPokemonRepo } from '../../repository/ExpansionPokemonRepo'
import UserCardStack from '@domain/UserCardStack'
import { Result } from '@use-cases/Result'

class GetCatalogUseCase {
  private readonly userCardRepo: IUserCardRepo
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  private readonly expansionPokemonRepo: IExpansionPokemonRepo

  constructor(
    userCardRepo: IUserCardRepo,
    cardTraderAdaptor: ICardTraderAdaptor,
    expansionPokemonRepo: IExpansionPokemonRepo
  ) {
    this.userCardRepo = userCardRepo
    this.cardTraderAdaptor = cardTraderAdaptor
    this.expansionPokemonRepo = expansionPokemonRepo
  }
  call = async (
    expansionId: number,
    blueprintValues: Map<string, BlueprintValue>,
    userId?: number
  ): Promise<Result<CatalogDto>> => {
    const [expansionCards, expansion] = await Promise.all([
      this.cardTraderAdaptor.getPokemonBlueprints(expansionId),
      this.expansionPokemonRepo.find(expansionId),
    ])

    let userCardStack: UserCardStack | undefined

    if (userId) {
      const userCards = await this.userCardRepo.listByExpansion(userId, expansionId)
      userCardStack = new UserCardStack(userCards)
    }

    const cards: CardDto[] = this.buildCardDtoList(expansionCards, blueprintValues, userCardStack)
    let details: ExpansionDetailsDto | null = null

    if (expansion) {
      const priceDetails = this.buildExpansionPriceDetails(cards)
      details = this.buildExpansionMainDetailsDto(expansion, priceDetails)
    }

    return Result.success({ details, cards })
  }

  private buildCardDtoList = (
    expansionCards: CardBlueprint[],
    blueprintValues: Map<string, BlueprintValue>,
    userCardStack?: UserCardStack
  ) => {
    return expansionCards.map((card) => {
      const blueprintValue = blueprintValues.get(`${card.blueprintId}`)

      const cardDto: CardDto = {
        blueprintId: card.blueprintId,
        expansionId: card.expansionId,
        name: card.name,
        imageUrlPreview: card.imageUrlPreview,
        imageUrlShow: card.imageUrlShow,
        owned: userCardStack?.filter(card.blueprintId).length ?? 0,
        medianMarketValueCents: blueprintValue?.medianCents ?? -1,
        listingCount: blueprintValue?.listingCount ?? -1,
      }

      return cardDto
    })
  }

  private buildExpansionMainDetailsDto = (
    expansion: ExpansionPokemonEntity,
    priceDetails: ExpansionPriceDetailsDto
  ): ExpansionDetailsDto | null => {
    const release = new Date(expansion.releaseDate)

    return {
      name: expansion.name,
      expansionNumber: expansion.expansionNumberInSeries,
      series: expansion.series,
      cardCount: expansion.numberOfCards,
      secretCardCount: expansion.numberOfSecretCards,
      releaseDate: release.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      logoUrl: expansion.logoUrl,
      symbolUrl: expansion.symbolUrl,
      bulbapediaUrl: expansion.bulbapediaUrl,
      priceDetails,
    }
  }

  private buildExpansionPriceDetails = (cards: CardDto[]): ExpansionPriceDetailsDto => {
    return cards.reduce(
      (acc, { medianMarketValueCents: v }) => {
        if (v >= 1 && v <= 49_99) acc.zeroToFifty++
        else if (v <= 99_99) acc.fiftyToOneHundred++
        else if (v <= 199_99) acc.oneHundredTwoHundred++
        else if (v >= 200_00) acc.twoHundredPlus++
        return acc
      },
      { zeroToFifty: 0, fiftyToOneHundred: 0, oneHundredTwoHundred: 0, twoHundredPlus: 0 }
    )
  }
}

export default GetCatalogUseCase
