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

    return myCardEntities.map((myCardEntity) =>
      this.buildCardDto(myCardEntity, blueprintValues)
    )
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
