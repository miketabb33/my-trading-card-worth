import { AddMyCardDto } from '../../../core/types/AddMyCardDto'
import { IMyCardCRUD, MyCardEntity } from '../../database/repository/MyCardCRUD'

import { createMongoId } from '../../database/createMongoId'

class AddCardLogic {
  private readonly myCardCRUD: IMyCardCRUD

  constructor(myCardCRUD: IMyCardCRUD) {
    this.myCardCRUD = myCardCRUD
  }

  add = async (userId: string, myCardDto: AddMyCardDto) => {
    const args: MyCardEntity = {
      _id: createMongoId(),
      userId,
      name: myCardDto.name,
      condition: myCardDto.condition,
      imageUrlPreview: myCardDto.imageUrlPreview,
      imageUrlShow: myCardDto.imageUrlShow,
      cardTrader: {
        blueprintId: myCardDto.blueprintId,
        expansionId: myCardDto.expansionId,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await this.myCardCRUD.add(args)

    return args._id
  }
}

export default AddCardLogic
