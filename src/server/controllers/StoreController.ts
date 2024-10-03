import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import Logger from '../logger'
import Store from '../StoreRegistry'
import GetStoreStatusLogic from '../logic/store/GetStoreStatusLogic'

const StoreController = Router()

StoreController.get('/status', (_, res) => {
  try {
    const getStoreStatusLogic = new GetStoreStatusLogic()

    const storeStatusDto = getStoreStatusLogic.get(
      Store.expansions.getLastUpdated(),
      Store.blueprintValues.getLastUpdated()
    )

    res.send(formatResponse({ data: storeStatusDto }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

StoreController.post('/marketplace/reload', (_, res) => {
  try {
    void Store.refresh()
    res.send(formatResponse({ data: 'Store refresh initiated' }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default StoreController
