import mongoose from 'mongoose'

export const createMongoId = (): string => {
  return new mongoose.Types.ObjectId().toString()
}
