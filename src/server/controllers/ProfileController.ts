import { Router } from 'express'
import { ProfileDto } from '../../core/types/ProfileDto'
import { asyncHandler } from '../http/asyncHandler'

const ProfileController = Router()

ProfileController.get(
  '/',
  asyncHandler((req, res) => {
    if (!req.currentUser) {
      res.sendError({ errors: ['User not logged in'] })
      return
    }

    const profileDto: ProfileDto = {
      userId: req.currentUser.externalId,
      name: req.currentUser.name,
      nickname: req.currentUser.nickname,
      email: req.currentUser.email,
      picture: req.currentUser.picture,
    }

    res.sendData({ data: profileDto })
  })
)

export default ProfileController
