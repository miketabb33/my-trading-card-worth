/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../formatResponse'
import Logger from '../../logger'
import { requiresAuth } from 'express-openid-connect'
import { parseAuth0User } from '../../auth0/parseAuth0User'
import MyCardCRUD, { MyCardEntity } from '../../database/MyCardCRUD'
import { tryToParseAddMyCardBody } from './parseAddMyCardBody'

const MyCardController = Router()

MyCardController.post('/add', requiresAuth(), async (req, res) => {
  try {
    const auth0User = parseAuth0User(req.oidc.user)
    const myCardDto = tryToParseAddMyCardBody(req.body)

    const entity: MyCardEntity = {
      userId: auth0User.sub,
      cardTraderId: myCardDto.cardTraderId,
      name: myCardDto.name,
      condition: myCardDto.condition,
    }

    const myCardCRUD = new MyCardCRUD()
    await myCardCRUD.add(entity)

    res.send(formatResponse({}))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default MyCardController
