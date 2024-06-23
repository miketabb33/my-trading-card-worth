import {
  CardBlueprintDto,
  SetDetailsDto,
  SetDto,
} from '../../../core/types/CardBlueprintDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IMyCardCRUD } from '../../database/repository/MyCardCRUD'
import { expansionStoreMap } from '../../stores/expansionStoreMap'
import { BlueprintValue } from '../../types/BlueprintValue'
import { CardBlueprint } from '../../types/CardBlueprint'

class GetSetBlueprintsLogic {
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
  ): Promise<SetDto> => {
    const set =
      await this.cardTraderAdaptor.getPokemonSetBlueprints(expansionId)

    let myCardMap: Map<number, number> | null

    if (userId) myCardMap = await this.buildMyCardMap(userId, expansionId)

    const blueprints: CardBlueprintDto[] = set.map((blueprint) =>
      this.buildBlueprints(blueprint, myCardMap, blueprintValues)
    )

    const dto: SetDto = {
      details: this.buildDetails(expansionId),
      blueprints,
    }

    return dto
  }

  private buildBlueprints = (
    item: CardBlueprint,
    myCardMap: Map<number, number> | null,
    blueprintValues: Map<string, BlueprintValue>
  ) => {
    const owned = myCardMap ? myCardMap.get(item.blueprintId) || 0 : 0
    const blueprintValue = blueprintValues.get(`${item.blueprintId}`)

    const minMarketValue = blueprintValue
      ? this.formatCentsToDollars(blueprintValue.minCents)
      : '...'

    const maxMarketValue = blueprintValue
      ? this.formatCentsToDollars(blueprintValue.maxCents)
      : '...'

    const averageMarketValue = blueprintValue
      ? this.formatCentsToDollars(blueprintValue.averageCents)
      : '...'

    const medianMarketValue = blueprintValue
      ? this.formatCentsToDollars(blueprintValue.medianCents)
      : '...'

    const cardBlueprintDto: CardBlueprintDto = {
      cardTraderBlueprintId: item.blueprintId,
      cardTraderExpansionId: item.expansionId,
      name: item.name,
      version: item.version,
      imageUrlPreview: item.imageUrlPreview,
      imageUrlShow: item.imageUrlShow,
      owned,
      minMarketValue,
      maxMarketValue,
      averageMarketValue,
      medianMarketValue,
    }

    return cardBlueprintDto
  }

  private formatCentsToDollars = (cents: number): string => {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  private buildDetails = (expansionId: number): SetDetailsDto | null => {
    const setDetails = expansionStoreMap.get(expansionId)

    if (!setDetails) return null

    const release = new Date(setDetails.releaseDate)

    const details: SetDetailsDto = {
      name: setDetails.name,
      setNumber: setDetails.setNumber,
      series: setDetails.series,
      cardCount: setDetails.numberOfCards,
      secretCardCount: setDetails.numberOfSecretCards,
      releaseDate: release.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      logoUrl: setDetails.logoUrl,
      symbolUrl: setDetails.symbolUrl,
      bulbapediaUrl: setDetails.bulbapediaUrl,
    }

    return details
  }

  private buildMyCardMap = async (userId: string, expansionId: number) => {
    const myCards = await this.myCardCRUD.findBySet(userId, expansionId)

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

export default GetSetBlueprintsLogic
