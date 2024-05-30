import { Schema, model } from 'mongoose'

export type MyCardEntity = {
  userId: string
  cardTraderId: number
  name: string
  condition: number
}

const myCardSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cardTraderId: {
      type: Number,
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
  },
  { timestamps: true }
)

const MyCardModel = model('my_card', myCardSchema)

class MyCardCRUD {
  add = async (entity: MyCardEntity) => {
    const context = new MyCardModel(entity)
    await context.save()
  }
}

export default MyCardCRUD
