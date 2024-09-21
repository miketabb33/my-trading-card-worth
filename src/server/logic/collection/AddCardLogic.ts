import { AddMyCardDto } from '../../../core/types/AddMyCardDto'
import { IMyCardCRUD, MyCardEntity, MyCardItemEntity } from '../../database/repository/MyCardCRUD'

import { createMongoId } from '../../database/createMongoId'

class AddCardLogic {
  private readonly myCardCRUD: IMyCardCRUD

  constructor(myCardCRUD: IMyCardCRUD) {
    this.myCardCRUD = myCardCRUD
  }

  add = async (userId: string, myCardDto: AddMyCardDto) => {
    const existingMyCardEntity = await this.myCardCRUD.findByBlueprintId(userId, myCardDto.blueprintId)

    const now = new Date()

    if (!existingMyCardEntity) {
      const args: MyCardEntity = {
        _id: createMongoId(),
        userId,
        name: myCardDto.name,
        items: [{ condition: myCardDto.condition }],
        imageUrlPreview: myCardDto.imageUrlPreview,
        imageUrlShow: myCardDto.imageUrlShow,
        cardTrader: {
          blueprintId: myCardDto.blueprintId,
          expansionId: myCardDto.expansionId,
        },
        createdAt: now,
        updatedAt: now,
      }
      await this.myCardCRUD.create(args)
    } else {
      const item: MyCardItemEntity = { condition: myCardDto.condition }
      await this.myCardCRUD.addItem(userId, myCardDto.blueprintId, item)
    }
  }
}

export default AddCardLogic
