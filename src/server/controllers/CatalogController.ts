import { Router } from 'express'
import { formatResponse } from '../http/formatResponse'
import { parseAuth0User } from '../auth0/parseAuth0User'
import GetCatalogLogic from '../logic/catalog/GetCatalogLogic'
import MyCardRepo from '../repository/MyCardRepo'
import CardTraderAdaptor from '../clients/CardTrader/CardTraderAdaptor'
import Store from '../StoreRegistry'
import ExpansionPokemonRepo from '../repository/ExpansionPokemonRepo'
import { asyncHandler } from '../http/asyncHandler'

const CatalogController = Router()

CatalogController.get('/', (_, res) => {
  const expansionsDto = Store.expansions.getState()
  res.send(formatResponse({ data: expansionsDto }))
})

CatalogController.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const expansionId = +req.params.id
    if (!expansionId) {
      res.send(formatResponse({ errors: [`${req.params.id} is not a valid expansion id`] }))
      return
    }

    const getCatalogLogic = new GetCatalogLogic(new MyCardRepo(), new CardTraderAdaptor(), new ExpansionPokemonRepo())

    const userId = req.oidc.user ? parseAuth0User(req.oidc.user).sub : null
    const catalogDto = await getCatalogLogic.get(userId, expansionId, Store.blueprintValues.getState())

    res.send(formatResponse({ data: catalogDto }))
  })
)

export default CatalogController
