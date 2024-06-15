import { MyCardDto } from '../../../core/types/MyCardDto'
import { IMyCardCRUD, MyCardEntity } from '../../database/MyCardCRUD'

import { createMongoId } from '../../database/createMongoId'

export class AddCardLogic {
  private readonly myCardCRUD: IMyCardCRUD

  constructor(myCardCRUD: IMyCardCRUD) {
    this.myCardCRUD = myCardCRUD
  }

  add = async (userId: string, myCardDto: MyCardDto) => {
    const args: MyCardEntity = {
      _id: createMongoId(),
      userId,
      name: myCardDto.name,
      condition: myCardDto.condition,
      cardTrader: {
        blueprintId: myCardDto.cardTraderBlueprintId,
        expansionId: myCardDto.cardTraderExpansionId,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await this.myCardCRUD.add(args)

    return args._id
  }
}
