import { Router } from 'express'
import GetCatalogLogic from '../logic/catalog/GetCatalogLogic'
import UserCardRepo from '../repository/UserCardRepo'
import CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import Store from '../StoreRegistry'
import ExpansionPokemonRepo from '../repository/ExpansionPokemonRepo'
import { asyncHandler } from '../http/asyncHandler'

const CatalogController = Router()

CatalogController.get('/', (_, res) => {
  res.sendData({ data: Store.expansions.getState() })
})

CatalogController.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const expansionId = +req.params.id
    if (!expansionId) {
      res.sendError({ errors: [`${req.params.id} is not a valid expansion id`] })
      return
    }

    const getCatalogLogic = new GetCatalogLogic(new UserCardRepo(), new CardTraderAdaptor(), new ExpansionPokemonRepo())

    const catalogDto = await getCatalogLogic.get(expansionId, Store.blueprintValues.getState(), req.currentUser?.id)

    res.sendData({ data: catalogDto })
  })
)

export default CatalogController
