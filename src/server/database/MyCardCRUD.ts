import { Schema, model } from 'mongoose'

export type MyCardEntity = {
  _id: string
  userId: string
  name: string
  condition: number
  cardTrader: {
    blueprintId: number
    expansionId: number
  }
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
    cardTrader: {
      type: {
        blueprintId: {
          type: Number,
          required: true,
        },
        expansionId: {
          type: Number,
          required: true,
        },
      },
      required: true,
    },
  },
  { timestamps: true }
)

const MyCardModel = model('my_card', myCardSchema)

export interface IMyCardCRUD {
  add: (entity: MyCardEntity) => Promise<void>
  findBySet: (userId: string, setId: number) => Promise<MyCardEntity[]>
}

class MyCardCRUD implements IMyCardCRUD {
  add = async (args: MyCardEntity) => {
    const context = new MyCardModel(args)
    await context.save()
  }

  findBySet = async (
    userId: string,
    setId: number
  ): Promise<MyCardEntity[]> => {
    const contexts = await MyCardModel.find({
      userId,
      'cardTrader.expansionId': setId,
    })
    if (!contexts) return []

    const myCards: MyCardEntity[] = contexts.map((context) => ({
      _id: context._id.toString(),
      userId: context.userId,
      name: context.name,
      cardTrader: {
        blueprintId: context.cardTrader.blueprintId,
        expansionId: context.cardTrader.expansionId,
      },
      condition: context.condition,
      createdAt: context.createdAt,
      updatedAt: context.updatedAt,
    }))
    return myCards
  }
}

export default MyCardCRUD
