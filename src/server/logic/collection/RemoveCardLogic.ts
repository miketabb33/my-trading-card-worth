import { IUserCardRepo } from '../../repository/UserCardRepo'

class RemoveCardLogic {
  private readonly userCardRepo: IUserCardRepo

  constructor(userCardRepo: IUserCardRepo) {
    this.userCardRepo = userCardRepo
  }

  remove = async (userId: string, blueprintId: number) => {
    await this.userCardRepo.removeItem(userId, blueprintId)
  }
}

export default RemoveCardLogic
