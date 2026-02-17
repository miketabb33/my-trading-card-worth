import { IMyCardRepo } from '../../repository/MyCardRepo'

class RemoveCardLogic {
  private readonly myCardRepo: IMyCardRepo

  constructor(myCardRepo: IMyCardRepo) {
    this.myCardRepo = myCardRepo
  }

  remove = async (userId: string, blueprintId: number) => {
    const existingMyCardEntity = await this.myCardRepo.findByBlueprintId(userId, blueprintId)

    if (!existingMyCardEntity) return

    const itemCount = existingMyCardEntity?.items.length || 0

    if (itemCount === 1) {
      await this.myCardRepo.delete(userId, blueprintId)
    } else {
      await this.myCardRepo.removeItem(userId, blueprintId)
    }
  }
}

export default RemoveCardLogic
