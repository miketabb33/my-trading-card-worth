import { Router } from 'express'
import { formatResponse } from '../logic/formatResponse'
import { requiresAuth } from 'express-openid-connect'
import { parseAuth0User } from '../auth0/parseAuth0User'
import { tryToParseAddMyCardBody } from '../logic/collection/parseAddMyCardBody'
import AddCardTraderCardLogic from '../logic/collection/AddCardTraderCardLogic'
import MyCardRepo from '../repository/MyCardRepo'
import ExpansionPokemonRepo from '../repository/ExpansionPokemonRepo'
import CardBlueprintPokemonRepo from '../repository/CardBlueprintPokemonRepo'
import CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import { tryToParseRemoveMyCardBody } from '../logic/collection/parseRemoveMyCardBody'
import GetCollectionLogic from '../logic/collection/GetCollectionLogic'
import Store from '../StoreRegistry'
import RemoveCardLogic from '../logic/collection/RemoveCardLogic'
import GetShareCollectionLogic from '../logic/collection/GetShareCollectionLogic'
import CollectionFactory from '../domain/CollectionFactory'
import { prisma } from '../../../prisma/prismaClient'
import { AppError } from '../AppError'
import { asyncHandler } from '../asyncHandler'

const CollectionController = Router()

CollectionController.get('/', requiresAuth(), asyncHandler(async (req, res) => {
  const auth0User = parseAuth0User(req.oidc.user)
  const collectionFactory = new CollectionFactory(new MyCardRepo(), Store.blueprintValues.getState())
  const getCollectionLogic = new GetCollectionLogic(collectionFactory)
  const cardBlueprintDto = await getCollectionLogic.get(auth0User.sub)
  res.send(formatResponse({ data: cardBlueprintDto }))
}))

CollectionController.get('/:userId', asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const collectionFactory = new CollectionFactory(new MyCardRepo(), Store.blueprintValues.getState())
  const getShareCollectionLogic = new GetShareCollectionLogic(prisma, collectionFactory)
  const dto = await getShareCollectionLogic.get(userId)
  res.send(formatResponse({ data: dto }))
}))

CollectionController.post('/', requiresAuth(), asyncHandler(async (req, res) => {
  const auth0User = parseAuth0User(req.oidc.user)
  const myCardDto = tryToParseAddMyCardBody(req.body)

  const profile = await prisma.profile.findUnique({ where: { userId: auth0User.sub } })
  if (!profile) throw new AppError(`No profile found for userId "${auth0User.sub}"`)

  const addCardTraderCardLogic = new AddCardTraderCardLogic(
    prisma,
    new CardTraderAdaptor(),
    new ExpansionPokemonRepo(),
    new CardBlueprintPokemonRepo()
  )
  await addCardTraderCardLogic.add(profile.id, myCardDto.blueprintId, myCardDto.expansionId, 'UNKNOWN')

  res.send(formatResponse({}))
}))

CollectionController.delete('/', requiresAuth(), asyncHandler(async (req, res) => {
  const auth0User = parseAuth0User(req.oidc.user)
  const blueprintId = tryToParseRemoveMyCardBody(req.body)
  const removeCardLogic = new RemoveCardLogic(new MyCardRepo())
  await removeCardLogic.remove(auth0User.sub, blueprintId)
  res.send(formatResponse({}))
}))

export default CollectionController
