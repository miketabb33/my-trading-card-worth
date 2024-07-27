import { CatalogDto } from '../../../core/types/CatalogDto'
import { CardDto } from '../../../core/types/CardDto'
import { ExpansionDetailsDto } from '../../../core/types/ExpansionDetailsDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IMyCardCRUD, MyCardEntity } from '../../database/repository/MyCardCRUD'
import { expansionStoreMap } from '../../stores/expansionStoreMap'
import { BlueprintValue } from '../../types/BlueprintValue'
import { CardBlueprint } from '../../types/CardBlueprint'

class GetCatalogLogic {
  private readonly myCardCRUD: IMyCardCRUD
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  constructor(myCardCRUD: IMyCardCRUD, cardTraderAdaptor: ICardTraderAdaptor) {
    this.myCardCRUD = myCardCRUD
    this.cardTraderAdaptor = cardTraderAdaptor
  }
  get = async (
    userId: string | null,
    expansionId: number,
    blueprintValues: Map<string, BlueprintValue>
  ): Promise<CatalogDto> => {
    const cardBlueprints =
      await this.cardTraderAdaptor.getPokemonBlueprints(expansionId)

    let myCardsInExpansion: MyCardEntity[] = []

    if (userId)
      myCardsInExpansion = await this.myCardCRUD.findByExpansion(
        userId,
        expansionId
      )

    const cardDto: CardDto[] = cardBlueprints.map((blueprint) => {
      const ownedCard = myCardsInExpansion.find(
        (myCard) => myCard.cardTrader.blueprintId === blueprint.blueprintId
      )
      const owned = ownedCard?.items.length || 0

      return this.buildCardDto(blueprint, owned, blueprintValues)
    })

    const details = this.buildExpansionMainDetailsDto(expansionId)

    const dto: CatalogDto = {
      details,
      cards: cardDto,
    }

    return dto
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
      minMarketValueCents: blueprintValue?.minCents ?? -1,
      maxMarketValueCents: blueprintValue?.maxCents ?? -1,
      averageMarketValueCents: blueprintValue?.averageCents ?? -1,
      medianMarketValueCents: blueprintValue?.medianCents ?? -1,
    }

    return cardDto
  }

  private buildExpansionMainDetailsDto = (
    expansionId: number
  ): ExpansionDetailsDto | null => {
    const expansionsData = expansionStoreMap.get(expansionId)

    if (!expansionsData) return null

    const release = new Date(expansionsData.releaseDate)

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
      priceDetails: {
        zeroToFifty: 5,
        fiftyToOneHundred: 10,
        oneHundredTwoHundred: 150,
        twoHundredPlus: 1234,
      },
    }

    return details
  }
}

export default GetCatalogLogic
