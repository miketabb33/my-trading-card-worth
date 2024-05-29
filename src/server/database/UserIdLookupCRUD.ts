import mongoose from 'mongoose'
import { uuid } from '../../core/uuid'
const { Schema, model } = mongoose

const userIdLookupSchema = new Schema(
  {
    auth0Id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const UserIdLookupModel = model('user_id_lookup', userIdLookupSchema)

class UserIdLookupCRUD {
  create = async (auth0Id: string) => {
    const userId = uuid()
    const context = new UserIdLookupModel({ auth0Id, userId })
    await context.save()
    return userId
  }

  findUserId = async (auth0Id: string): Promise<string | null> => {
    const context = await UserIdLookupModel.findOne({ auth0Id })
    return context?.userId ?? null
  }
}

export default UserIdLookupCRUD
