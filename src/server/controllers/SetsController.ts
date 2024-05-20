/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from './formatResponse'
import Logger from '../logger'
import * as CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'

const SetsController = Router()

SetsController.get('/', async (_, res) => {
  try {
    const pokemonSets = await CardTraderAdaptor.getPokemonSets()
    res.send(formatResponse({ data: pokemonSets }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

SetsController.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id
    if (!id) throw new Error(`${req.params.id} is not a valid expansion id`)

    const set = await CardTraderAdaptor.getPokemonSet(id)
    res.send(formatResponse({ data: set }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default SetsController
