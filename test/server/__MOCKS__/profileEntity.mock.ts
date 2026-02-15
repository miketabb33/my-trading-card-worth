import { Profile } from '@prisma/client'

export const makeProfileEntityMock = ({
  id = 0,
  userId = '',
  email = '',
  name = '',
  nickname = '',
  picture = '',
  createdAt = new Date(),
  updatedAt = new Date(),
}: Partial<Profile>): Profile => ({
  id,
  userId,
  email,
  name,
  nickname,
  picture,
  createdAt,
  updatedAt,
})
