import { prisma } from '../../../prisma/prismaClient'
import { parseAuth0User } from '../auth0/parseAuth0User'
import { asyncHandler } from './asyncHandler'
import Emailer from '../Emailer'

export const currentUserMiddleware = asyncHandler(async (req, _res, next) => {
  if (!req.oidc.isAuthenticated() || !req.oidc.user) {
    req.currentUser = null
    next()
    return
  }

  const auth0User = parseAuth0User(req.oidc.user)
  let user = await prisma.user.findUnique({ where: { externalId: auth0User.sub } })

  if (!user) {
    user = await prisma.user.create({
      data: {
        externalId: auth0User.sub,
        email: auth0User.email ?? '',
        name: auth0User.name ?? '',
        nickname: auth0User.nickname ?? '',
        picture: auth0User.picture ?? '',
      },
    })
    void Emailer.send({
      to: 'miketabb33@gmail.com',
      subject: 'Account Created',
      text: `${auth0User.email ?? 'Someone'} has created an account!`,
    })
  }

  req.currentUser = user
  next()
})
