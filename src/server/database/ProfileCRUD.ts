import mongoose from 'mongoose'
const { Schema, model } = mongoose

export type ProfileEntity = {
  userId: string
  email: string | null
  name: string | null
  nickname: string | null
  picture: string | null
}

const profileSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: String,
    nickname: String,
    email: String,
    picture: String,
  },
  { timestamps: true }
)

const ProfileModel = model('profile', profileSchema)

class ProfileCRUD {
  create = async (entity: ProfileEntity) => {
    const context = new ProfileModel(entity)
    await context.save()
  }

  find = async (userId: string): Promise<ProfileEntity | null> => {
    const context = await ProfileModel.findOne({ userId })
    if (!context) return null
    const profile: ProfileEntity = {
      userId: context.userId,
      email: context.email ?? null,
      name: context.name ?? null,
      nickname: context.nickname ?? null,
      picture: context.picture ?? null,
    }
    return profile
  }
}

export default ProfileCRUD
