/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { IMyCardCRUD, MyCardEntity } from '../../database/repository/MyCardCRUD'
import { BlueprintValue } from '../../types/BlueprintValue'

class GetCardLogic {
  private readonly myCardCRUD: IMyCardCRUD

  constructor(myCardCRUD: IMyCardCRUD) {
    this.myCardCRUD = myCardCRUD
  }

  get = async (
    userId: string,
    blueprintValues: Map<string, BlueprintValue>
  ): Promise<CardBlueprintDto[]> => {
    const myCardEntities = await this.myCardCRUD.getAll(userId)

    const cardBlueprintDtoMap = new Map<number, CardBlueprintDto>()

    myCardEntities.forEach((myCardEntity) => {
      const existingCardBlueprint = cardBlueprintDtoMap.get(
        myCardEntity.cardTrader.blueprintId
      )

      if (existingCardBlueprint) {
        existingCardBlueprint.owned += 1
      } else {
        const cardBlueprintDto = this.makeBlueprintItem(
          myCardEntity,
          blueprintValues
        )
        cardBlueprintDtoMap.set(
          cardBlueprintDto.cardTraderBlueprintId,
          cardBlueprintDto
        )
      }
    })

    return Array.from(cardBlueprintDtoMap, ([_, value]) => value)
  }

  private makeBlueprintItem = (
    myCardEntity: MyCardEntity,
    blueprintValues: Map<string, BlueprintValue>
  ) => {
    const blueprintValue = blueprintValues.get(
      `${myCardEntity.cardTrader.blueprintId}`
    )

    const blueprint: CardBlueprintDto = {
      cardTraderBlueprintId: myCardEntity.cardTrader.blueprintId,
      cardTraderExpansionId: myCardEntity.cardTrader.expansionId,
      name: myCardEntity.name,
      imageUrlPreview: myCardEntity.imageUrlPreview,
      imageUrlShow: myCardEntity.imageUrlShow,
      owned: 1,
      minMarketValueCents: blueprintValue?.minCents || -1,
      maxMarketValueCents: blueprintValue?.maxCents || -1,
      averageMarketValueCents: blueprintValue?.averageCents || -1,
      medianMarketValueCents: blueprintValue?.medianCents || -1,
    }
    return blueprint
  }
}

export default GetCardLogic
