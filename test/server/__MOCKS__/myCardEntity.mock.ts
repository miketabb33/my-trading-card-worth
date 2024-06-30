import { MyCardEntity } from '../../../src/server/database/repository/MyCardCRUD'

type MakeMyCardEntityMockArgs = {
  _id?: string
  userId?: string
  name?: string
  condition?: number
  imageUrlPreview?: string
  imageUrlShow?: string
  cardTrader?: {
    blueprintId?: number
    expansionId?: number
  }
  createdAt?: Date
  updatedAt?: Date
}

export const makeMyCardEntityMock = ({
  _id = '_id',
  userId = 'userId',
  name = 'name',
  condition = 5,
  imageUrlPreview = 'preview',
  imageUrlShow = 'show',
  cardTrader = { blueprintId: 3, expansionId: 4 },
  createdAt = new Date(),
  updatedAt = new Date(),
}: MakeMyCardEntityMockArgs): MyCardEntity => ({
  _id,
  userId,
  name,
  condition,
  imageUrlPreview,
  imageUrlShow,
  cardTrader: {
    blueprintId: cardTrader.blueprintId || 3,
    expansionId: cardTrader.expansionId || 4,
  },
  createdAt,
  updatedAt,
})
