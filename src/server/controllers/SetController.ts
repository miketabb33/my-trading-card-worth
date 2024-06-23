/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import Logger from '../logger'
import { parseAuth0User } from '../auth0/parseAuth0User'
import GetSetBlueprintsLogic from '../logic/set/GetSetBlueprintsLogic'
import MyCardCRUD from '../database/repository/MyCardCRUD'
import CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import Store from '../StoreRegistry'

const SetController = Router()

SetController.get('/', async (_, res) => {
  try {
    const sets = await Store.sets.get()
    res.send(formatResponse({ data: sets }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

SetController.get('/:id', async (req, res) => {
  try {
    const expansionId = +req.params.id
    if (!expansionId)
      throw new Error(`${req.params.id} is not a valid expansion id`)

    const getSetBlueprintsLogic = new GetSetBlueprintsLogic(
      new MyCardCRUD(),
      new CardTraderAdaptor()
    )

    const userId = req.oidc.user ? parseAuth0User(req.oidc.user).sub : null
    const dto = await getSetBlueprintsLogic.get(userId, expansionId)

    res.send(formatResponse({ data: dto }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default SetController
