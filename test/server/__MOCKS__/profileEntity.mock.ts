import { User } from '@prisma/client'

export const makeProfileEntityMock = ({
  id = 0,
  externalId = '',
  email = '',
  name = '',
  nickname = '',
  picture = '',
  createdAt = new Date(),
  updatedAt = new Date(),
}: Partial<User>): User => ({
  id,
  externalId,
  email,
  name,
  nickname,
  picture,
  createdAt,
  updatedAt,
})
