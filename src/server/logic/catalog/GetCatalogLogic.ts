import { CatalogDto } from '../../../core/types/CatalogDto'
import { CardDto } from '../../../core/types/CardDto'
import { ExpansionDetailsDto } from '../../../core/types/ExpansionDetailsDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IMyCardRepo, MyCardEntity } from '../../repository/MyCardRepo'
import { BlueprintValue } from '../../types/BlueprintValue'
import { CardBlueprint } from '../../types/CardBlueprint'
import { ExpansionPriceDetailsDto } from '../../../core/types/ExpansionPriceDetailsDto'
import { IExpansionRepo } from '../../repository/ExpansionRepo'

class GetCatalogLogic {
  private readonly myCardRepo: IMyCardRepo
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  private readonly expansionRepo: IExpansionRepo

  constructor(myCardRepo: IMyCardRepo, cardTraderAdaptor: ICardTraderAdaptor, expansionRepo: IExpansionRepo) {
    this.myCardRepo = myCardRepo
    this.cardTraderAdaptor = cardTraderAdaptor
    this.expansionRepo = expansionRepo
  }
  get = async (
    userId: string | null,
    expansionId: number,
    blueprintValues: Map<string, BlueprintValue>
  ): Promise<CatalogDto> => {
    const cardBlueprints = await this.cardTraderAdaptor.getPokemonBlueprints(expansionId)

    let myCardsInExpansion: MyCardEntity[] = []

    if (userId) myCardsInExpansion = await this.myCardRepo.findByExpansion(userId, expansionId)

    const cards: CardDto[] = this.buildCardDtoList(cardBlueprints, myCardsInExpansion, blueprintValues)

    const details = await this.buildExpansionMainDetailsDto(expansionId)

    if (details) details.priceDetails = this.buildExpansionPriceDetails(cards)

    const dto: CatalogDto = {
      details,
      cards: cards,
    }

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
    cardBlueprints: CardBlueprint[],
    myCardsInExpansion: MyCardEntity[],
    blueprintValues: Map<string, BlueprintValue>
  ) => {
    const cardDto: CardDto[] = cardBlueprints.map((blueprint) => {
      const ownedCard = myCardsInExpansion.find((myCard) => myCard.cardTrader.blueprintId === blueprint.blueprintId)
      const owned = ownedCard?.items.length || 0

      return this.buildCardDto(blueprint, owned, blueprintValues)
    })

    return cardDto
  }

  private buildCardDto = (
    cardBlueprint: CardBlueprint,
    owned: number,
    blueprintValues: Map<string, BlueprintValue>
  ) => {
    const blueprintValue = blueprintValues.get(`${cardBlueprint.blueprintId}`)

    const cardDto: CardDto = {
      blueprintId: cardBlueprint.blueprintId,
      expansionId: cardBlueprint.expansionId,
      name: cardBlueprint.name,
      imageUrlPreview: cardBlueprint.imageUrlPreview,
      imageUrlShow: cardBlueprint.imageUrlShow,
      owned,
      medianMarketValueCents: blueprintValue?.medianCents ?? -1,
      listingCount: blueprintValue?.listingCount ?? -1,
    }

    return cardDto
  }

  private buildExpansionMainDetailsDto = async (expansionId: number): Promise<ExpansionDetailsDto | null> => {
    const expansionsData = await this.expansionRepo.find(expansionId)

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
