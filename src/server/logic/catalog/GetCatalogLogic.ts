import { CatalogDto } from '../../../core/types/CatalogDto'
import { CardDto } from '../../../core/types/CardDto'
import { ExpansionDetailsDto } from '../../../core/types/ExpansionDetailsDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IMyCardCRUD } from '../../database/repository/MyCardCRUD'
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

    let myCardMap: Map<number, number> | null

    if (userId) myCardMap = await this.buildMyCardMap(userId, expansionId)

    const cardDto: CardDto[] = cardBlueprints.map((blueprint) =>
      this.buildCardDto(blueprint, myCardMap, blueprintValues)
    )

    const details = this.buildExpansionDetailsDto(expansionId)

    const dto: CatalogDto = {
      details,
      cards: cardDto,
    }

    return dto
  }

  private buildCardDto = (
    cardBlueprint: CardBlueprint,
    myCardMap: Map<number, number> | null,
    blueprintValues: Map<string, BlueprintValue>
  ) => {
    const owned = myCardMap ? myCardMap.get(cardBlueprint.blueprintId) || 0 : 0
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

  private buildExpansionDetailsDto = (
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
    }

    return details
  }

  private buildMyCardMap = async (userId: string, expansionId: number) => {
    const myCards = await this.myCardCRUD.findByExpansion(userId, expansionId)

    const myCardMap = new Map<number, number>()

    myCards.forEach((card) => {
      const existingMapItemCount = myCardMap.get(card.cardTrader.blueprintId)
      if (!existingMapItemCount) {
        myCardMap.set(card.cardTrader.blueprintId, 1)
      } else {
        myCardMap.set(card.cardTrader.blueprintId, existingMapItemCount + 1)
      }
    })
    return myCardMap
  }
}

export default GetCatalogLogic
