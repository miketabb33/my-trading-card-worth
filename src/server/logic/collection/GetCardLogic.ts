/* eslint-disable @typescript-eslint/no-unused-vars */
import { Collection } from 'mongoose'
import { CardDto } from '../../../core/types/CardDto'
import { IMyCardCRUD, MyCardEntity } from '../../database/repository/MyCardCRUD'
import { BlueprintValue } from '../../types/BlueprintValue'
import { CollectionDto } from '../../../core/types/CollectionDto'
import { MyCollectionDetailsDto } from '../../../core/types/MyCollectionDetailsDto'

class GetCardLogic {
  private readonly myCardCRUD: IMyCardCRUD

  constructor(myCardCRUD: IMyCardCRUD) {
    this.myCardCRUD = myCardCRUD
  }

  get = async (
    userId: string,
    blueprintValues: Map<string, BlueprintValue>
  ): Promise<CollectionDto> => {
    const myCardEntities = await this.myCardCRUD.getAll(userId)

    const totalValue = this.getEmptyBlueprintValue()

    const myCards = myCardEntities.map((myCardEntity) => {
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
      cards: myCards,
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
      minMarketValueCents: blueprintValue.minCents,
      maxMarketValueCents: blueprintValue.maxCents,
      averageMarketValueCents: blueprintValue.averageCents,
      medianMarketValueCents: blueprintValue.medianCents,
    }
    return cardDto
  }

  private buildMyCollectionDetailsDto = (
    totalValue: BlueprintValue
  ): MyCollectionDetailsDto => {
    return {
      minMarketValueCents: totalValue.minCents,
      maxMarketValueCents: totalValue.maxCents,
      averageMarketValueCents: totalValue.averageCents,
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

export default GetCardLogic
