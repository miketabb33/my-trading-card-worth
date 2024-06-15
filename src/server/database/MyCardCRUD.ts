import mongoose, { Schema, model } from 'mongoose'
import { CardTraderEntity } from './CardTraderCRUD'

type MyCardBaseEntity = {
  _id: string
  userId: string
  name: string
  condition: number
  createdAt: Date
  updatedAt: Date
}

export type MyCardEntity = {
  cardTrader: CardTraderEntity
} & MyCardBaseEntity

const myCardSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    condition: {
      type: Number,
      required: true,
    },
    cardTrader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'card_trader',
      required: true,
    },
  },
  { timestamps: true }
)

const MyCardModel = model('my_card', myCardSchema)

export interface IMyCardCRUD {
  add: (entity: AddMyCardArgs) => Promise<void>
  find: (userId: string) => Promise<MyCardEntity | null>
}

export type AddMyCardArgs = {
  cardTrader: string
} & MyCardBaseEntity

class MyCardCRUD implements IMyCardCRUD {
  add = async (args: AddMyCardArgs) => {
    const context = new MyCardModel(args)
    await context.save()
  }

  find = async (userId: string): Promise<MyCardEntity | null> => {
    const context = await MyCardModel.findOne({ userId }).populate<{
      cardTrader: CardTraderEntity
    }>('cardTrader')
    if (!context) return null

    const myCard: MyCardEntity = {
      _id: context._id.toString(),
      userId: context.userId,
      name: context.name,
      cardTrader: context.cardTrader,
      condition: context.condition,
      createdAt: context.createdAt,
      updatedAt: context.updatedAt,
    }
    return myCard
  }
}

export default MyCardCRUD
