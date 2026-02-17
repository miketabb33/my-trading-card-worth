/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose'

export type MyCardItemEntity = {
  condition: number
}

export type MyCardEntity = {
  _id: string
  userId: string
  name: string
  items: MyCardItemEntity[]
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
    items: [
      {
        condition: {
          type: Number,
          required: true,
        },
      },
    ],
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

export interface IMyCardRepo {
  create: (entity: MyCardEntity) => Promise<void>
  addItem: (userId: string, blueprintId: number, item: MyCardItemEntity) => Promise<void>
  delete: (userId: string, blueprintId: number) => Promise<void>
  removeItem: (userId: string, blueprintId: number) => Promise<void>
  findByExpansion: (userId: string, expansionId: number) => Promise<MyCardEntity[]>
  findByBlueprintId: (userId: string, blueprintId: number) => Promise<MyCardEntity | null>

  getAll: (userId: string) => Promise<MyCardEntity[]>
}

class MyCardRepo implements IMyCardRepo {
  create = async (args: MyCardEntity) => {
    const context = new MyCardModel(args)
    await context.save()
  }

  addItem = async (userId: string, blueprintId: number, item: MyCardItemEntity): Promise<void> => {
    const context = await MyCardModel.findOne({
      userId,
      'cardTrader.blueprintId': blueprintId,
    })
    context?.items.push(item)
    await context?.save()
  }

  delete = async (userId: string, blueprintId: number) => {
    await MyCardModel.findOneAndDelete({
      userId,
      'cardTrader.blueprintId': blueprintId,
    })
  }

  removeItem = async (userId: string, blueprintId: number) => {
    const context = await MyCardModel.findOne({
      userId,
      'cardTrader.blueprintId': blueprintId,
    })

    if (!context) return

    context.items.pop()

    await context.save()
  }

  findByExpansion = async (userId: string, expansionId: number): Promise<MyCardEntity[]> => {
    const contexts = await MyCardModel.find({
      userId,
      'cardTrader.expansionId': expansionId,
    })
    if (!contexts) return []

    const myCards: MyCardEntity[] = contexts.map(this.mapContextToMyCardEntity)
    return myCards
  }

  findByBlueprintId = async (userId: string, blueprintId: number): Promise<MyCardEntity | null> => {
    const context = await MyCardModel.findOne({
      userId,
      'cardTrader.blueprintId': blueprintId,
    })

    if (!context) return null

    return this.mapContextToMyCardEntity(context)
  }

  getAll = async (userId: string): Promise<MyCardEntity[]> => {
    const contexts = await MyCardModel.find({
      userId,
    })
    if (!contexts) return []

    const myCards: MyCardEntity[] = contexts.map(this.mapContextToMyCardEntity)

    return myCards
  }

  private mapContextToMyCardEntity = (context: any): MyCardEntity => ({
    _id: context._id.toString(),
    userId: context.userId,
    name: context.name,
    imageUrlPreview: context.imageUrlPreview,
    imageUrlShow: context.imageUrlShow,
    cardTrader: {
      blueprintId: context.cardTrader.blueprintId,
      expansionId: context.cardTrader.expansionId,
    },
    items: context.items,
    createdAt: context.createdAt,
    updatedAt: context.updatedAt,
  })
}

export default MyCardRepo
