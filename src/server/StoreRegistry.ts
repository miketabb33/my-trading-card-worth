import CardTraderAdaptor from './clients/CardTrader/CardTraderAdaptor'
import { ENV } from './env'
import GetBlueprintValueLogic from './logic/price/GetBlueprintValueLogic'
import ExpansionSorter from './logic/catalog/ExpansionSorter'
import GetExpansionsLogic from './logic/catalog/GetExpansionsLogic'
import BlueprintValueStore from './stores/BlueprintValueStore'
import ExpansionsStore from './stores/ExpansionsStore'
import { expansionStoreMap } from './stores/expansionStoreMap'

const Store = {
  expansions: new ExpansionsStore(
    new GetExpansionsLogic(
      new CardTraderAdaptor(),
      new ExpansionSorter(),
      expansionStoreMap
    )
  ),
  blueprintValues: new BlueprintValueStore(
    new GetBlueprintValueLogic(new CardTraderAdaptor())
  ),
}

export const initStores = async () => {
  if (ENV.ID === 'production') {
    await Store.expansions.refreshStore()
    const expansionIds = (await Store.expansions.getState()).map(
      (expansion) => expansion.expansionId
    )
    await Store.blueprintValues.refreshStore(expansionIds)
  } else {
    Store.expansions.initStubbedStore()
  }
}

export default Store
