import { PrismaClient } from '@prisma/client'

export const makePrismaClientMock = <T>(shape: T): T & PrismaClient => {
  return { ...shape } as T & PrismaClient
}
