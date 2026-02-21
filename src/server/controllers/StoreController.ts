/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express'
import { formatResponse } from '../logic/formatResponse'
import Store from '../StoreRegistry'
import GetStoreStatusLogic from '../logic/store/GetStoreStatusLogic'
import { ENV } from '../env'

const StoreController = Router()

StoreController.get('/status', (_, res) => {
  const getStoreStatusLogic = new GetStoreStatusLogic()
  const storeStatusDto = getStoreStatusLogic.get(
    Store.expansions.getLastUpdated(),
    Store.blueprintValues.getLastUpdated()
  )
  res.send(formatResponse({ data: storeStatusDto }))
})

StoreController.post('/marketplace/refresh', (req, res) => {
  if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
    res.status(401).send()
    return
  }
  void Store.blueprintValues.refreshStore()
  res.send(formatResponse({ data: 'marketplace refresh initiated' }))
})

StoreController.post('/expansions/refresh', (req, res) => {
  if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
    res.status(401).send()
    return
  }
  void Store.expansions.refreshStore()
  res.send(formatResponse({ data: 'expansions refresh initiated' }))
})

export default StoreController
