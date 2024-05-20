/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from './formatResponse'
import Logger from '../logger'
import * as CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'

const CardController = Router()

CardController.get('/', async (_, res) => {
  try {
    const pokemonSets = await CardTraderAdaptor.getPokemonSets()
    res.send(formatResponse({ data: pokemonSets }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default CardController
