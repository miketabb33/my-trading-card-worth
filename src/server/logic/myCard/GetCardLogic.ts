/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardDto } from '../../../core/types/CardDto'
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
  ): Promise<CardDto[]> => {
    const myCardEntities = await this.myCardCRUD.getAll(userId)

    const cardsDtoMap = new Map<number, CardDto>()

    myCardEntities.forEach((myCardEntity) => {
      const existingCardInMap = cardsDtoMap.get(
        myCardEntity.cardTrader.blueprintId
      )

      if (existingCardInMap) {
        existingCardInMap.owned += 1
      } else {
        const cardDto = this.makeCardDto(myCardEntity, blueprintValues)
        cardsDtoMap.set(cardDto.blueprintId, cardDto)
      }
    })

    return Array.from(cardsDtoMap, ([_, value]) => value)
  }

  private makeCardDto = (
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
      owned: 1,
      minMarketValueCents: blueprintValue?.minCents || -1,
      maxMarketValueCents: blueprintValue?.maxCents || -1,
      averageMarketValueCents: blueprintValue?.averageCents || -1,
      medianMarketValueCents: blueprintValue?.medianCents || -1,
    }
    return cardDto
  }
}

export default GetCardLogic
