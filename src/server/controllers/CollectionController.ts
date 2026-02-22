import { Router } from 'express'
import { tryToParseAddMyCardBody } from '../use-cases/collection/parseAddMyCardBody'
import AddCardTraderCardUseCase from '../use-cases/collection/AddCardTraderCardUseCase'
import UserCardRepo from '../repository/UserCardRepo'
import ExpansionPokemonRepo from '../repository/ExpansionPokemonRepo'
import CardBlueprintPokemonRepo from '../repository/CardBlueprintPokemonRepo'
import CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import { tryToParseRemoveMyCardBody } from '../use-cases/collection/parseRemoveMyCardBody'
import GetCollectionUseCase from '../use-cases/collection/GetCollectionUseCase'
import Store from '../StoreRegistry'
import RemoveCardUseCase from '../use-cases/collection/RemoveCardUseCase'
import GetShareCollectionUseCase from '../use-cases/collection/GetShareCollectionUseCase'
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
    const getCollectionUseCase = new GetCollectionUseCase(collectionFactory)
    const result = await getCollectionUseCase.get(req.currentUser!.id)
    if (result.isSuccess()) {
      res.sendData({ data: result.value, status: 200 })
    } else {
      res.sendError({ errors: [result.error], status: 404 })
    }
  })
)

CollectionController.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const userId = Number(req.params.userId)
    const collectionFactory = new CollectionFactory(new UserCardRepo(), Store.blueprintValues.getState())
    const getShareCollectionUseCase = new GetShareCollectionUseCase(prisma, collectionFactory)
    const result = await getShareCollectionUseCase.get(userId)
    if (result.isSuccess()) {
      res.sendData({ data: result.value, status: 200 })
    } else {
      res.sendError({ errors: [result.error], status: 404 })
    }
  })
)

CollectionController.post(
  '/',
  requiresAuth(),
  asyncHandler(async (req, res) => {
    const myCardDto = tryToParseAddMyCardBody(req.body)
    const addCardTraderCardUseCase = new AddCardTraderCardUseCase(
      prisma,
      new CardTraderAdaptor(),
      new ExpansionPokemonRepo(),
      new CardBlueprintPokemonRepo()
    )
    const result = await addCardTraderCardUseCase.add(
      req.currentUser!.id,
      myCardDto.blueprintId,
      myCardDto.expansionId,
      'UNKNOWN'
    )
    if (result.isSuccess()) {
      res.sendSuccess({ status: 201 })
    } else {
      res.sendError({ errors: [result.error], status: 409 })
    }
  })
)

CollectionController.delete(
  '/',
  requiresAuth(),
  asyncHandler(async (req, res) => {
    const blueprintId = tryToParseRemoveMyCardBody(req.body)
    const removeCardUseCase = new RemoveCardUseCase(new UserCardRepo())
    const result = await removeCardUseCase.remove(req.currentUser!.externalId, blueprintId)
    if (result.isSuccess()) {
      res.sendSuccess({ status: 204 })
    } else {
      res.sendError({ errors: [result.error], status: 409 })
    }
  })
)

export default CollectionController
