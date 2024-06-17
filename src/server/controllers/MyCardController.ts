/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import Logger from '../logger'
import { requiresAuth } from 'express-openid-connect'
import { parseAuth0User } from '../auth0/parseAuth0User'
import { tryToParseAddMyCardBody } from '../logic/myCard/parseAddMyCardBody'
import AddCardLogic from '../logic/myCard/AddCardLogic'
import MyCardCRUD from '../database/repository/MyCardCRUD'

const MyCardController = Router()

MyCardController.post('/add', requiresAuth(), async (req, res) => {
  try {
    const auth0User = parseAuth0User(req.oidc.user)
    const myCardDto = tryToParseAddMyCardBody(req.body)

    const addCardLogic = new AddCardLogic(new MyCardCRUD())

    await addCardLogic.add(auth0User.sub, myCardDto)

    res.send(formatResponse({}))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default MyCardController
