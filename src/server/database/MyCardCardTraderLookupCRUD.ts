import { Schema, model } from 'mongoose'

export type MyCardCardTraderLookupEntity = {
  _id: string
  myCardId: string
  cardTraderId: string
  createdAt: Date
  updatedAt: Date
}

const myCardCardTraderLookupSchema = new Schema(
  {
    myCardId: {
      type: String,
      required: true,
    },
    cardTraderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const MyCardCardTraderLookupModel = model(
  'my_card_card_trader_lookup',
  myCardCardTraderLookupSchema
)

export interface IMyCardCardTraderLookupCRUD {
  add: (entity: MyCardCardTraderLookupEntity) => Promise<void>
}

class MyCardCardTraderLookupCRUD implements IMyCardCardTraderLookupCRUD {
  add = async (entity: MyCardCardTraderLookupEntity) => {
    const context = new MyCardCardTraderLookupModel(entity)
    await context.save()
  }
}

export default MyCardCardTraderLookupCRUD
