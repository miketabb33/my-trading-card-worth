/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import Logger from '../logger'
import { parseAuth0User } from '../auth0/parseAuth0User'
import GetSetBlueprintsLogic from '../logic/set/GetSetBlueprintsLogic'
import MyCardCRUD from '../database/repository/MyCardCRUD'
import CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import GetSetsLogic from '../logic/set/GetSetsLogic'
import { CardSetDto } from '../../core/types/CardSetDto'
import ExpansionSorter from '../logic/set/ExpansionSorter'
import { expansionStoreMap } from '../expansionStoreMap'

const SetController = Router()

let setsCache: CardSetDto[] | null

SetController.get('/', async (_, res) => {
  try {
    const getSetsLogic = new GetSetsLogic(
      new CardTraderAdaptor(),
      new ExpansionSorter(),
      expansionStoreMap
    )

    if (!setsCache) setsCache = await getSetsLogic.get()

    res.send(formatResponse({ data: setsCache }))
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
