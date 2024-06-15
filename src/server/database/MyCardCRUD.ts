import { Schema, model } from 'mongoose'

export type MyCardEntity = {
  _id: string
  userId: string
  name: string
  condition: number
  createdAt: Date
  updatedAt: Date
}

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
  },
  { timestamps: true }
)

const MyCardModel = model('my_card', myCardSchema)

export interface IMyCardCRUD {
  add: (entity: MyCardEntity) => Promise<void>
}

class MyCardCRUD implements IMyCardCRUD {
  add = async (entity: MyCardEntity) => {
    const context = new MyCardModel(entity)
    await context.save()
  }
}

export default MyCardCRUD
