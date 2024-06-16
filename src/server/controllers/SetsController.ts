/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from './formatResponse'
import Logger from '../logger'
import * as CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import { parseAuth0User } from '../auth0/parseAuth0User'
import MyCardCRUD from '../database/MyCardCRUD'
import { CardSetDto } from '../../core/types/CardSetDto'
import { CardBlueprintDto } from '../../core/types/CardBlueprintDto'

const SetsController = Router()

SetsController.get('/', async (_, res) => {
  try {
    const pokemonSets = await CardTraderAdaptor.getPokemonSets()

    const dto: CardSetDto[] = pokemonSets.map((set) => ({
      name: set.name,
      cardTraderExpansionId: set.expansionId,
    }))

    res.send(formatResponse({ data: dto }))
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

    const set = await CardTraderAdaptor.getPokemonSetBlueprints(
      cardTraderExpansionId
    )

    const dto: CardBlueprintDto[] = set.map((item) => ({
      cardTraderBlueprintId: item.blueprintId,
      cardTraderExpansionId: item.expansionId,
      name: item.name,
      version: item.version,
      imageUrlPreview: item.imageUrlPreview,
      imageUrlShow: item.imageUrlShow,
    }))

    if (req.oidc.user) {
      const auth0User = parseAuth0User(req.oidc.user)
      const myCardCRUD = new MyCardCRUD()

      const myCards = await myCardCRUD.findBySet(
        auth0User.sub,
        cardTraderExpansionId
      )

      console.log(myCards)

      res.send(formatResponse({ data: dto }))
    } else {
      res.send(formatResponse({ data: dto }))
    }
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default SetsController
