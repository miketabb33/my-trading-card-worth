import { Router } from 'express'
import { tryToParseAddMyCardBody } from '../logic/collection/parseAddMyCardBody'
import AddCardTraderCardLogic from '../logic/collection/AddCardTraderCardLogic'
import UserCardRepo from '../repository/UserCardRepo'
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
import { asyncHandler } from '../http/asyncHandler'
import { requiresAuth } from 'express-openid-connect'

const CollectionController = Router()

CollectionController.get(
  '/',
  requiresAuth(),
  asyncHandler(async (req, res) => {
    const collectionFactory = new CollectionFactory(new UserCardRepo(), Store.blueprintValues.getState())
    const getCollectionLogic = new GetCollectionLogic(collectionFactory)
    const cardBlueprintDto = await getCollectionLogic.get(req.currentUser!.externalId)
    res.sendData({ data: cardBlueprintDto })
  })
)

CollectionController.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId
    const collectionFactory = new CollectionFactory(new UserCardRepo(), Store.blueprintValues.getState())
    const getShareCollectionLogic = new GetShareCollectionLogic(prisma, collectionFactory)
    const dto = await getShareCollectionLogic.get(userId)
    res.sendData({ data: dto })
  })
)

CollectionController.post(
  '/',
  requiresAuth(),
  asyncHandler(async (req, res) => {
    const myCardDto = tryToParseAddMyCardBody(req.body)
    const addCardTraderCardLogic = new AddCardTraderCardLogic(
      prisma,
      new CardTraderAdaptor(),
      new ExpansionPokemonRepo(),
      new CardBlueprintPokemonRepo()
    )
    await addCardTraderCardLogic.add(req.currentUser!.id, myCardDto.blueprintId, myCardDto.expansionId, 'UNKNOWN')
    res.sendSuccess({ status: 201 })
  })
)

CollectionController.delete(
  '/',
  requiresAuth(),
  asyncHandler(async (req, res) => {
    const blueprintId = tryToParseRemoveMyCardBody(req.body)
    const removeCardLogic = new RemoveCardLogic(new UserCardRepo())
    await removeCardLogic.remove(req.currentUser!.externalId, blueprintId)
    res.sendSuccess()
  })
)

export default CollectionController
