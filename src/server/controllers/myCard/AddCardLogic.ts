import { MyCardDto } from '../../../core/types/MyCardDto'
import {
  CardTraderEntity,
  ICardTraderCRUD,
} from '../../database/CardTraderCRUD'
import { AddMyCardArgs, IMyCardCRUD } from '../../database/MyCardCRUD'

import { createMongoId } from '../../database/createMongoId'

export class AddCardLogic {
  private readonly cardTraderCRUD: ICardTraderCRUD
  private readonly myCardCRUD: IMyCardCRUD

  constructor(cardTraderCRUD: ICardTraderCRUD, myCardCRUD: IMyCardCRUD) {
    this.cardTraderCRUD = cardTraderCRUD
    this.myCardCRUD = myCardCRUD
  }

  add = async (userId: string, myCardDto: MyCardDto) => {
    const cardTraderId = await this.getCardTraderId(myCardDto)
    await this.addMyCardToDatabase(userId, cardTraderId, myCardDto)
  }

  private getCardTraderId = async (myCardDto: MyCardDto): Promise<string> => {
    const entity = await this.cardTraderCRUD.find(
      myCardDto.cardTraderBlueprintId
    )

    if (entity) return entity._id

    return await this.addCardTraderToDatabase(myCardDto)
  }

  private addCardTraderToDatabase = async (
    myCardDto: MyCardDto
  ): Promise<string> => {
    const entity: CardTraderEntity = {
      _id: createMongoId(),
      blueprintId: myCardDto.cardTraderBlueprintId,
      expansionId: myCardDto.cardTraderExpansionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await this.cardTraderCRUD.add(entity)
    return entity._id
  }

  private addMyCardToDatabase = async (
    userId: string,
    cardTraderId: string,
    myCardDto: MyCardDto
  ): Promise<string> => {
    const args: AddMyCardArgs = {
      _id: createMongoId(),
      userId,
      name: myCardDto.name,
      condition: myCardDto.condition,
      cardTrader: cardTraderId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await this.myCardCRUD.add(args)

    return args._id
  }
}
