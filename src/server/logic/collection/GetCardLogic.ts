/* eslint-disable @typescript-eslint/no-unused-vars */
import { Collection } from 'mongoose'
import { CardDto } from '../../../core/types/CardDto'
import { IMyCardCRUD, MyCardEntity } from '../../database/repository/MyCardCRUD'
import { BlueprintValue } from '../../types/BlueprintValue'
import { CollectionDto } from '../../../core/types/CollectionDto'

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

    const myCards = myCardEntities.map((myCardEntity) =>
      this.buildCardDto(myCardEntity, blueprintValues)
    )

    return {
      cards: myCards,
      details: {
        minMarketValueCents: 100,
        maxMarketValueCents: 200,
        medianMarketValueCents: 120,
        averageMarketValueCents: 150,
      },
    }
  }

  private buildCardDto = (
    myCardEntity: MyCardEntity,
    blueprintValues: Map<string, BlueprintValue>
  ) => {
    const blueprintValue = blueprintValues.get(
      `${myCardEntity.cardTrader.blueprintId}`
    )

    const cardDto: CardDto = {
      blueprintId: myCardEntity.cardTrader.blueprintId,
      expansionId: myCardEntity.cardTrader.expansionId,
      name: myCardEntity.name,
      imageUrlPreview: myCardEntity.imageUrlPreview,
      imageUrlShow: myCardEntity.imageUrlShow,
      owned: myCardEntity.items.length,
      minMarketValueCents: blueprintValue?.minCents || -1,
      maxMarketValueCents: blueprintValue?.maxCents || -1,
      averageMarketValueCents: blueprintValue?.averageCents || -1,
      medianMarketValueCents: blueprintValue?.medianCents || -1,
    }
    return cardDto
  }
}

export default GetCardLogic
