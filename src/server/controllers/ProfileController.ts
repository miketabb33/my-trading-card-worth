/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import { parseAuth0User } from '../auth0/parseAuth0User'
import Logger from '../logger'
import { prisma } from '../../../prisma/prismaClient'
import { ProfileDto } from '../../core/types/ProfileDto'
import { Auth0User } from '../auth0/types/Auth0User'
import Emailer from '../Emailer'

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

    const profileDto: ProfileDto = {
      userId: profile.userId,
      name: profile.name,
      nickname: profile.nickname,
      email: profile.email,
      picture: profile.picture,
    }

    res.send(formatResponse({ data: profileDto }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

const getProfile = async (auth0User: Auth0User) => {
  let profile = await prisma.profile.findUnique({ where: { userId: auth0User.sub } })
  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        userId: auth0User.sub,
        email: auth0User.email ?? '',
        name: auth0User.name ?? '',
        nickname: auth0User.nickname ?? '',
        picture: auth0User.picture ?? '',
      },
    })
    await sendAccountCreatedEmail(auth0User.email ?? 'Someone')
  }
  return profile
}

const sendAccountCreatedEmail = (email: string) => {
  return Emailer.send({
    to: 'miketabb33@gmail.com',
    subject: 'Account Created',
    text: `${email} has created an account!`,
  })
}

export default ProfileController
