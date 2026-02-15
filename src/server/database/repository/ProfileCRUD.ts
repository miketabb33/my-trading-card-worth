import { Profile, Prisma } from '@prisma/client'
import { prisma } from '../prismaClient'

export interface IProfileCRUD {
  create: (data: Prisma.ProfileCreateInput) => Promise<void>
  find: (userId: string) => Promise<Profile | null>
}

class ProfileCRUD implements IProfileCRUD {
  create = async (data: Prisma.ProfileCreateInput) => {
    await prisma.profile.create({ data })
  }

  find = async (userId: string): Promise<Profile | null> => {
    return await prisma.profile.findUnique({ where: { userId } })
  }
}

export default ProfileCRUD
