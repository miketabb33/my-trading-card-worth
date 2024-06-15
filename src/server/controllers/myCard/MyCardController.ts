/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../formatResponse'
import Logger from '../../logger'
import { requiresAuth } from 'express-openid-connect'
import { parseAuth0User } from '../../auth0/parseAuth0User'
import MyCardCRUD, { MyCardEntity } from '../../database/MyCardCRUD'
import { tryToParseAddMyCardBody } from './parseAddMyCardBody'
import { createMongoId } from '../../database/createMongoId'

const MyCardController = Router()

MyCardController.post('/add', requiresAuth(), async (req, res) => {
  try {
    const auth0User = parseAuth0User(req.oidc.user)
    const myCardDto = tryToParseAddMyCardBody(req.body)

    const entity: MyCardEntity = {
      _id: createMongoId(),
      userId: auth0User.sub,
      name: myCardDto.name,
      condition: myCardDto.condition,
      createdAt: new Date(),
      updatedAt: new Date(),
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
