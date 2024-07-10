import { Schema, model } from 'mongoose'

export type MyCardEntity = {
  _id: string
  userId: string
  name: string
  condition: number
  imageUrlPreview: string
  imageUrlShow: string
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
    imageUrlPreview: {
      type: String,
      required: true,
    },
    imageUrlShow: {
      type: String,
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
  getAll: (userId: string) => Promise<MyCardEntity[]>
}

class MyCardCRUD implements IMyCardCRUD {
  add = async (args: MyCardEntity) => {
    const context = new MyCardModel(args)
    await context.save()
  }

  remove = async (userId: string, blueprintId: number) => {
    await MyCardModel.findOneAndDelete({
      userId,
      'cardTrader.blueprintId': blueprintId,
    })
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
      imageUrlPreview: context.imageUrlPreview,
      imageUrlShow: context.imageUrlShow,
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

  getAll = async (userId: string): Promise<MyCardEntity[]> => {
    const contexts = await MyCardModel.find({
      userId,
    })
    if (!contexts) return []

    const myCards: MyCardEntity[] = contexts.map((context) => ({
      _id: context._id.toString(),
      userId: context.userId,
      name: context.name,
      imageUrlPreview: context.imageUrlPreview,
      imageUrlShow: context.imageUrlShow,
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
