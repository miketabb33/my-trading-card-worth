/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express'
import Store from '../StoreRegistry'
import GetStoreStatusUseCase from '../use-cases/store/GetStoreStatusUseCase'
import { ENV } from '../env'

const StoreController = Router()

StoreController.get('/status', (_, res) => {
  const getStoreStatusUseCase = new GetStoreStatusUseCase()
  const result = getStoreStatusUseCase.get(Store.expansions.getLastUpdated(), Store.blueprintValues.getLastUpdated())
  if (result.isSuccess()) {
    res.sendData({ data: result.value })
  } else {
    res.sendError({ errors: [result.error] })
  }
})

StoreController.post('/marketplace/refresh', (req, res) => {
  if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
    res.status(401).send()
    return
  }
  void Store.blueprintValues.refreshStore()
  res.sendData({ data: 'marketplace refresh initiated' })
})

StoreController.post('/expansions/refresh', (req, res) => {
  if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
    res.sendError({ errors: [], status: 401 })
    return
  }
  void Store.expansions.refreshStore()
  res.sendData({ data: 'expansions refresh initiated' })
})

export default StoreController
