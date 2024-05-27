import { Router } from 'express'
import { formatError, formatResponse } from './formatResponse'
import { parseAuth0User } from '../auth0/parseAuth0User'
import Logger from '../logger'

const ProfileController = Router()

ProfileController.get('/', (req, res) => {
  try {
    const user = req.oidc.user
    if (!user) {
      res.send(formatResponse({ errors: ['User not logged in'] }))
      return
    }
    const auth0User = parseAuth0User(user)
    res.send(formatResponse({ data: auth0User }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default ProfileController
