import mongoose from 'mongoose'
import { ENV } from '../env'

export const connectToDb = async () => {
  await mongoose.connect(ENV.MONGO.CONNECTION_STRING())
}
