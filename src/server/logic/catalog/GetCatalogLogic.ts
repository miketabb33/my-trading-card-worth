import { CatalogDto } from '../../../core/types/CatalogDto'
import { CardDto } from '../../../core/types/CardDto'
import { ExpansionDetailsDto } from '../../../core/types/ExpansionDetailsDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IUserCardRepo } from '../../repository/UserCardRepo'
import { BlueprintValue } from '../../types/BlueprintValue'
import { CardBlueprint } from '../../types/CardBlueprint'
import { ExpansionPriceDetailsDto } from '../../../core/types/ExpansionPriceDetailsDto'
import { IExpansionPokemonRepo } from '../../repository/ExpansionPokemonRepo'
import UserCardStack from '@domain/UserCardStack'

class GetCatalogLogic {
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
  get = async (
    expansionId: number,
    blueprintValues: Map<string, BlueprintValue>,
    userId?: number
  ): Promise<CatalogDto> => {
    const expansionCards = await this.cardTraderAdaptor.getPokemonBlueprints(expansionId)

    let userCardStack: UserCardStack | undefined

    if (userId) {
      const cards = await this.userCardRepo.listByExpansion(userId, expansionId)
      console.log(cards)
      userCardStack = new UserCardStack(cards)
    }

    const cards: CardDto[] = this.buildCardDtoList(expansionCards, blueprintValues, userCardStack)

    const details = await this.buildExpansionMainDetailsDto(expansionId)

    if (details) details.priceDetails = this.buildExpansionPriceDetails(cards)

    const dto: CatalogDto = { details, cards }

    return dto
  }

  private buildExpansionPriceDetails = (cards: CardDto[]) => {
    const zeroToFiftyCards = cards.filter((card) => {
      return card.medianMarketValueCents >= 1 && card.medianMarketValueCents <= 49_99
    })

    const fiftyToOneHundredCards = cards.filter((card) => {
      return card.medianMarketValueCents >= 50_00 && card.medianMarketValueCents <= 99_99
    })

    const oneHundredTwoHundredCards = cards.filter((card) => {
      return card.medianMarketValueCents >= 100_00 && card.medianMarketValueCents <= 199_99
    })

    const twoHundredPlus = cards.filter((card) => {
      return card.medianMarketValueCents >= 200_00
    })

    const priceDetails: ExpansionPriceDetailsDto = {
      zeroToFifty: zeroToFiftyCards.length,
      fiftyToOneHundred: fiftyToOneHundredCards.length,
      oneHundredTwoHundred: oneHundredTwoHundredCards.length,
      twoHundredPlus: twoHundredPlus.length,
    }
    return priceDetails
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

  private buildExpansionMainDetailsDto = async (expansionId: number): Promise<ExpansionDetailsDto | null> => {
    const expansionsData = await this.expansionPokemonRepo.find(expansionId)

    if (!expansionsData) return null

    const release = new Date(expansionsData.releaseDate)

    const priceDetailsPlaceholder = {
      zeroToFifty: 0,
      fiftyToOneHundred: 0,
      oneHundredTwoHundred: 0,
      twoHundredPlus: 0,
    }

    const details: ExpansionDetailsDto = {
      name: expansionsData.name,
      expansionNumber: expansionsData.expansionNumberInSeries,
      series: expansionsData.series,
      cardCount: expansionsData.numberOfCards,
      secretCardCount: expansionsData.numberOfSecretCards,
      releaseDate: release.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      logoUrl: expansionsData.logoUrl,
      symbolUrl: expansionsData.symbolUrl,
      bulbapediaUrl: expansionsData.bulbapediaUrl,
      priceDetails: priceDetailsPlaceholder,
    }

    return details
  }
}

export default GetCatalogLogic
