import { AddMyCardDto } from '../../../core/types/AddMyCardDto'
import { IMyCardRepo, MyCardEntity, MyCardItemEntity } from '../../repository/MyCardRepo'

import { createMongoId } from '../../database/createMongoId'

class AddCardLogic {
  private readonly myCardRepo: IMyCardRepo

  constructor(myCardRepo: IMyCardRepo) {
    this.myCardRepo = myCardRepo
  }

  add = async (userId: string, myCardDto: AddMyCardDto) => {
    const existingMyCardEntity = await this.myCardRepo.findByBlueprintId(userId, myCardDto.blueprintId)

    const now = new Date()

    if (!existingMyCardEntity) {
      const args: MyCardEntity = {
        _id: createMongoId(),
        userId,
        name: myCardDto.name,
        items: [{ condition: 0 }],
        imageUrlPreview: myCardDto.imageUrlPreview,
        imageUrlShow: myCardDto.imageUrlShow,
        cardTrader: {
          blueprintId: myCardDto.blueprintId,
          expansionId: myCardDto.expansionId,
        },
        createdAt: now,
        updatedAt: now,
      }
      await this.myCardRepo.create(args)
    } else {
      const item: MyCardItemEntity = { condition: 0 }
      await this.myCardRepo.addItem(userId, myCardDto.blueprintId, item)
    }
  }
}

export default AddCardLogic
