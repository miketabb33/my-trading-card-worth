import { IMyCardCRUD } from '../../database/repository/MyCardCRUD'

class RemoveCardLogic {
  private readonly myCardCRUD: IMyCardCRUD

  constructor(myCardCRUD: IMyCardCRUD) {
    this.myCardCRUD = myCardCRUD
  }

  remove = async (userId: string, blueprintId: number) => {
    const existingMyCardEntity = await this.myCardCRUD.findByBlueprintId(
      userId,
      blueprintId
    )

    if (!existingMyCardEntity) return

    const itemCount = existingMyCardEntity?.items.length || 0

    if (itemCount === 1) {
      await this.myCardCRUD.delete(userId, blueprintId)
    } else {
      await this.myCardCRUD.removeItem(userId, blueprintId)
    }
  }
}

export default RemoveCardLogic
