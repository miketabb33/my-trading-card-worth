/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from './formatResponse'
import Logger from '../logger'
import * as CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import { parseAuth0User } from '../auth0/parseAuth0User'
import MyCardCRUD from '../database/MyCardCRUD'

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
    const cardTraderExpansionId = +req.params.id
    if (!cardTraderExpansionId)
      throw new Error(`${req.params.id} is not a valid expansion id`)

    const set = await CardTraderAdaptor.getPokemonSet(cardTraderExpansionId)

    if (req.oidc.user) {
      const auth0User = parseAuth0User(req.oidc.user)
      const myCardCRUD = new MyCardCRUD()

      const myCards = await myCardCRUD.findBySet(
        auth0User.sub,
        cardTraderExpansionId
      )

      console.log(myCards)

      res.send(formatResponse({ data: set }))
    } else {
      res.send(formatResponse({ data: set }))
    }
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default SetsController
