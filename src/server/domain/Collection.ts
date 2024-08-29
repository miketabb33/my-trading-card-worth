import { CardDto } from '../../core/types/CardDto'
import { CollectionMetaDto } from '../../core/types/CollectionMetaDto'
import { MyCardEntity } from '../database/repository/MyCardCRUD'
import { BlueprintValue } from '../types/BlueprintValue'

export interface ICollection {
  cards: () => CardDto[]
  details: () => CollectionMetaDto
}

class Collection implements ICollection {
  private cardCollection: CardDto[]
  private cardDetails: CollectionMetaDto

  constructor(
    cardEntities: MyCardEntity[],
    blueprintValues: Map<string, BlueprintValue>
  ) {
    const { cards, details } = this.calculateValues(
      cardEntities,
      blueprintValues
    )
    this.cardCollection = cards
    this.cardDetails = details
  }

  cards = () => {
    return this.cardCollection
  }

  details = () => {
    return this.cardDetails
  }

  private calculateValues = (
    cardEntities: MyCardEntity[],
    blueprintValues: Map<string, BlueprintValue>
  ) => {
    const totalValue = this.getEmptyBlueprintValue()

    const cardCollection = cardEntities.map((myCardEntity) => {
      let blueprintValue = blueprintValues.get(
        `${myCardEntity.cardTrader.blueprintId}`
      )

      if (blueprintValue)
        this.addBlueprintValueToTotalValues(
          totalValue,
          blueprintValue,
          myCardEntity.items.length
        )

      if (!blueprintValue) blueprintValue = this.getMissingBlueprintValue()

      return this.buildCardDto(myCardEntity, blueprintValue)
    })

    return {
      cards: cardCollection,
      details: this.buildMyCollectionDetailsDto(totalValue),
    }
  }

  private buildCardDto = (
    myCardEntity: MyCardEntity,
    blueprintValue: BlueprintValue
  ) => {
    const cardDto: CardDto = {
      blueprintId: myCardEntity.cardTrader.blueprintId,
      expansionId: myCardEntity.cardTrader.expansionId,
      name: myCardEntity.name,
      imageUrlPreview: myCardEntity.imageUrlPreview,
      imageUrlShow: myCardEntity.imageUrlShow,
      owned: myCardEntity.items.length,
      medianMarketValueCents: blueprintValue.medianCents,
    }
    return cardDto
  }

  private buildMyCollectionDetailsDto = (
    totalValue: BlueprintValue
  ): CollectionMetaDto => {
    return {
      medianMarketValueCents: totalValue.medianCents,
    }
  }

  private addBlueprintValueToTotalValues = (
    totalValues: BlueprintValue,
    blueprintValue: BlueprintValue,
    blueprintCount: number
  ) => {
    for (let i = 1; i <= blueprintCount; i++) {
      totalValues.minCents += blueprintValue.minCents
      totalValues.maxCents += blueprintValue.maxCents
      totalValues.averageCents += blueprintValue.averageCents
      totalValues.medianCents += blueprintValue.medianCents
    }
  }

  private getEmptyBlueprintValue = (): BlueprintValue => {
    return {
      minCents: 0,
      maxCents: 0,
      medianCents: 0,
      averageCents: 0,
    }
  }

  private getMissingBlueprintValue = (): BlueprintValue => {
    return {
      minCents: -1,
      maxCents: -1,
      averageCents: -1,
      medianCents: -1,
    }
  }
}

export default Collection
