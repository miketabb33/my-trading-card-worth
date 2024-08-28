/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import Logger from '../logger'
import { requiresAuth } from 'express-openid-connect'
import { parseAuth0User } from '../auth0/parseAuth0User'
import { tryToParseAddMyCardBody } from '../logic/collection/parseAddMyCardBody'
import AddCardLogic from '../logic/collection/AddCardLogic'
import MyCardCRUD from '../database/repository/MyCardCRUD'
import { tryToParseRemoveMyCardBody } from '../logic/collection/parseRemoveMyCardBody'
import GetCollectionLogic from '../logic/collection/GetCollectionLogic'
import Store from '../StoreRegistry'
import RemoveCardLogic from '../logic/collection/RemoveCardLogic'
import GetShareCollectionLogic from '../logic/collection/GetShareCollectionLogic'
import CollectionFactory from '../domain/CollectionFactory'

const CollectionController = Router()

CollectionController.get('/', requiresAuth(), async (req, res) => {
  try {
    const auth0User = parseAuth0User(req.oidc.user)

    const collectionFactory = new CollectionFactory(
      new MyCardCRUD(),
      Store.blueprintValues.getState()
    )

    const getCollectionLogic = new GetCollectionLogic(collectionFactory)

    const cardBlueprintDto = await getCollectionLogic.get(auth0User.sub)

    res.send(formatResponse({ data: cardBlueprintDto }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

CollectionController.get('/:userId', (req, res) => {
  try {
    const getShareCollectionLogic = new GetShareCollectionLogic()
    res.send(formatResponse({ data: getShareCollectionLogic.get() }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

CollectionController.post('/', requiresAuth(), async (req, res) => {
  try {
    const auth0User = parseAuth0User(req.oidc.user)
    const myCardDto = tryToParseAddMyCardBody(req.body)

    const addCardLogic = new AddCardLogic(new MyCardCRUD())

    await addCardLogic.add(auth0User.sub, myCardDto)

    res.send(formatResponse({}))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

CollectionController.delete('/', requiresAuth(), async (req, res) => {
  try {
    const auth0User = parseAuth0User(req.oidc.user)
    const blueprintId = tryToParseRemoveMyCardBody(req.body)

    const removeCardLogic = new RemoveCardLogic(new MyCardCRUD())

    await removeCardLogic.remove(auth0User.sub, blueprintId)

    res.send(formatResponse({}))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default CollectionController
