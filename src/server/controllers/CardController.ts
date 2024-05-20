/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as CardTraderClient from '../clients/CardTrader/CardTraderClient'
import { formatResponse } from './formatResponse'

const CardController = Router()

CardController.get('/', async (_, res) => {
  try {
    const data = await CardTraderClient.getExpansions()
    res.send(formatResponse({ data }))
  } catch (err) {
    console.log(err)
  }
})

export default CardController
