import { ProfileEntity } from '../../../src/server/database/repository/ProfileCRUD'

export const makeProfileEntityMock = ({
  _id = '',
  userId = '',
  email = null,
  name = null,
  nickname = null,
  picture = null,
  createdAt = new Date(),
  updatedAt = new Date(),
}: Partial<ProfileEntity>): ProfileEntity => ({
  _id,
  userId,
  email,
  name,
  nickname,
  picture,
  createdAt,
  updatedAt,
})
