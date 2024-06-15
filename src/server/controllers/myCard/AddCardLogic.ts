import { MyCardDto } from '../../../core/types/MyCardDto'
import {
  CardTraderEntity,
  ICardTraderCRUD,
} from '../../database/CardTraderCRUD'
import { IMyCardCRUD, MyCardEntity } from '../../database/MyCardCRUD'
import {
  IMyCardCardTraderLookupCRUD,
  MyCardCardTraderLookupEntity,
} from '../../database/MyCardCardTraderLookupCRUD'
import { createMongoId } from '../../database/createMongoId'

export class AddCardLogic {
  private readonly cardTraderCRUD: ICardTraderCRUD
  private readonly myCardCRUD: IMyCardCRUD
  private readonly myCardCardTraderLookupCRUD: IMyCardCardTraderLookupCRUD

  constructor(
    cardTraderCRUD: ICardTraderCRUD,
    myCardCRUD: IMyCardCRUD,
    myCardCardTraderLookupCRUD: IMyCardCardTraderLookupCRUD
  ) {
    this.cardTraderCRUD = cardTraderCRUD
    this.myCardCRUD = myCardCRUD
    this.myCardCardTraderLookupCRUD = myCardCardTraderLookupCRUD
  }

  add = async (userId: string, myCardDto: MyCardDto) => {
    const myCardId = await this.addMyCardToDatabase(userId, myCardDto)
    const cardTraderId = await this.getCardTraderId(myCardDto)

    await this.addMyCardCardTraderLookupToDatabase(myCardId, cardTraderId)
  }

  private addMyCardToDatabase = async (
    userId: string,
    myCardDto: MyCardDto
  ): Promise<string> => {
    const entity: MyCardEntity = {
      _id: createMongoId(),
      userId,
      name: myCardDto.name,
      condition: myCardDto.condition,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await this.myCardCRUD.add(entity)

    return entity._id
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

  private addMyCardCardTraderLookupToDatabase = async (
    myCardId: string,
    cardTraderId: string
  ) => {
    const entity: MyCardCardTraderLookupEntity = {
      _id: createMongoId(),
      myCardId,
      cardTraderId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await this.myCardCardTraderLookupCRUD.add(entity)
  }
}
