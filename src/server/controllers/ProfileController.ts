/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from './formatResponse'
import { parseAuth0User } from '../auth0/parseAuth0User'
import Logger from '../logger'
import ProfileCRUD, { ProfileEntity } from '../database/ProfileCRUD'
import { ProfileDto } from '../../core/types/ProfileDto'
import { Auth0User } from '../auth0/types/Auth0User'

const ProfileController = Router()

ProfileController.get('/', async (req, res) => {
  try {
    const user = req.oidc.user

    if (!user || !req.oidc.isAuthenticated()) {
      res.send(formatResponse({ errors: ['User not logged in'] }))
      return
    }

    const auth0User = parseAuth0User(user)
    const profile = await getProfile(auth0User)

    const dto: ProfileDto = {
      userId: profile.userId,
      name: profile.name ?? 'Unknown Name',
      nickname: profile.nickname ?? 'Unknown Nickname',
      email: profile.email,
      picture: profile.picture,
    }

    res.send(formatResponse({ data: dto }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

const getProfile = async (auth0User: Auth0User) => {
  const profileCRUD = new ProfileCRUD()
  let profile = await profileCRUD.find(auth0User.sub)
  if (!profile) {
    const profileEntity: ProfileEntity = {
      userId: auth0User.sub,
      email: auth0User.email,
      name: auth0User.name,
      nickname: auth0User.nickname,
      picture: auth0User.picture,
    }
    await profileCRUD.create(profileEntity)
    profile = profileEntity
  }
  return profile
}

export default ProfileController
