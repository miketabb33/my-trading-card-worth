import { Router } from 'express'
import { ProfileDto } from '../../core/types/ProfileDto'
import { asyncHandler } from '../http/asyncHandler'
import { User } from '@prisma/client'

const ProfileController = Router()

ProfileController.get(
  '/',
  asyncHandler((req, res) => {
    if (!req.currentUser) {
      res.sendError({ errors: ['User not logged in'] })
      return
    }

    res.sendData({ data: profileDto(req.currentUser) })
  })
)

const profileDto = (user: User): ProfileDto => ({
  userId: user.externalId,
  name: user.name,
  nickname: user.nickname,
  email: user.email,
  picture: user.picture,
})

export default ProfileController
