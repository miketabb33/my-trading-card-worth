import { MyCardEntity } from '../../../src/server/database/repository/MyCardCRUD'

type MakeMyCardEntityMockArgs = {
  _id?: string
  userId?: string
  name?: string
  condition?: number
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
  cardTrader = { blueprintId: 3, expansionId: 4 },
  createdAt = new Date(),
  updatedAt = new Date(),
}: MakeMyCardEntityMockArgs): MyCardEntity => ({
  _id,
  userId,
  name,
  condition,
  cardTrader: {
    blueprintId: cardTrader.blueprintId || 3,
    expansionId: cardTrader.expansionId || 4,
  },
  createdAt,
  updatedAt,
})
