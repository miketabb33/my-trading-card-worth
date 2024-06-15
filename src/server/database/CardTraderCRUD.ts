import { Schema, model } from 'mongoose'

export type CardTraderEntity = {
  _id: string
  blueprintId: number
  expansionId: number
  createdAt: Date
  updatedAt: Date
}

const cardTraderSchema = new Schema(
  {
    blueprintId: {
      type: Number,
      required: true,
    },
    expansionId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const CardTraderModel = model('card_trader', cardTraderSchema)

export interface ICardTraderCRUD {
  add: (entity: CardTraderEntity) => Promise<void>
  find: (blueprintId: number) => Promise<CardTraderEntity | null>
}

class CardTraderCRUD implements ICardTraderCRUD {
  add = async (entity: CardTraderEntity) => {
    const context = new CardTraderModel(entity)
    await context.save()
  }

  find = async (blueprintId: number): Promise<CardTraderEntity | null> => {
    const context = await CardTraderModel.findOne({ blueprintId })
    if (!context) return null
    const cardTrader: CardTraderEntity = {
      _id: context._id.toString(),
      blueprintId: context.blueprintId,
      expansionId: context.expansionId,
      createdAt: context.createdAt,
      updatedAt: context.updatedAt,
    }
    return cardTrader
  }
}

export default CardTraderCRUD
