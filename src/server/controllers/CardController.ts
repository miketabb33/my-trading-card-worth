/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as CardTraderClient from '../clients/CardTrader/CardTraderClient'
import { formatError, formatResponse } from './formatResponse'
import Logger from '../logger'

const CardController = Router()

CardController.get('/', async (_, res) => {
  try {
    const data = await CardTraderClient.getExpansions()
    res.send(formatResponse({ data }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default CardController
