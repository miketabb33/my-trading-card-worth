/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import Logger from '../logger'
import Store from '../StoreRegistry'
import GetStoreStatusLogic from '../logic/store/GetStoreStatusLogic'
import { ENV } from '../env'

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

StoreController.post('/marketplace/refresh', (req, res) => {
  try {
    if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
      res.status(401).send()
      return
    }

    void Store.blueprintValues.refreshStore()
    res.send(formatResponse({ data: 'marketplace refresh initiated' }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

StoreController.post('/expansions/refresh', (req, res) => {
  try {
    if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
      res.status(401).send()
      return
    }

    void Store.expansions.refreshStore()
    res.send(formatResponse({ data: 'expansions refresh initiated' }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default StoreController
