import { IUserCardRepo } from '../../repository/UserCardRepo'

class RemoveCardLogic {
  private readonly userCardRepo: IUserCardRepo

  constructor(userCardRepo: IUserCardRepo) {
    this.userCardRepo = userCardRepo
  }

  remove = async (userId: string, blueprintId: number) => {
    const existingMyCardEntity = await this.userCardRepo.findByBlueprintId(userId, blueprintId)

    if (!existingMyCardEntity) return

    const itemCount = existingMyCardEntity?.items.length || 0

    if (itemCount === 1) {
      await this.userCardRepo.delete(userId, blueprintId)
    } else {
      await this.userCardRepo.removeItem(userId, blueprintId)
    }
  }
}

export default RemoveCardLogic
