/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import Logger from '../logger'
import * as CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import { parseAuth0User } from '../auth0/parseAuth0User'
import MyCardCRUD from '../database/repository/MyCardCRUD'
import { CardSetDto } from '../../core/types/CardSetDto'
import { CardBlueprintDto } from '../../core/types/CardBlueprintDto'

const SetController = Router()

SetController.get('/', async (_, res) => {
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

SetController.get('/:id', async (req, res) => {
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
      owned: 0,
    }))

    if (req.oidc.user) {
      const auth0User = parseAuth0User(req.oidc.user)
      const myCardCRUD = new MyCardCRUD()

      const myCards = await myCardCRUD.findBySet(
        auth0User.sub,
        cardTraderExpansionId
      )

      const myCardMap = new Map<number, number>()

      myCards.forEach((card) => {
        const existingMapItemCount = myCardMap.get(card.cardTrader.blueprintId)
        if (!existingMapItemCount) {
          myCardMap.set(card.cardTrader.blueprintId, 1)
        } else {
          myCardMap.set(card.cardTrader.blueprintId, existingMapItemCount + 1)
        }
      })

      console.log(myCardMap)

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

export default SetController
