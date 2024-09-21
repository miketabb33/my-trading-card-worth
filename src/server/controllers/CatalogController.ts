/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import Logger from '../logger'
import { parseAuth0User } from '../auth0/parseAuth0User'
import GetCatalogLogic from '../logic/catalog/GetCatalogLogic'
import MyCardCRUD from '../database/repository/MyCardCRUD'
import CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import Store from '../StoreRegistry'
import ExpansionCRUD from '../database/repository/ExpansionCRUD'

const CatalogController = Router()

CatalogController.get('/', (_, res) => {
  try {
    const expansionsDto = Store.expansions.getState()
    res.send(formatResponse({ data: expansionsDto }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

CatalogController.get('/:id', async (req, res) => {
  try {
    const expansionId = +req.params.id
    if (!expansionId) throw new Error(`${req.params.id} is not a valid expansion id`)

    const getCatalogLogic = new GetCatalogLogic(new MyCardCRUD(), new CardTraderAdaptor(), new ExpansionCRUD())

    const userId = req.oidc.user ? parseAuth0User(req.oidc.user).sub : null
    const catalogDto = await getCatalogLogic.get(userId, expansionId, Store.blueprintValues.getState())

    res.send(formatResponse({ data: catalogDto }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default CatalogController
