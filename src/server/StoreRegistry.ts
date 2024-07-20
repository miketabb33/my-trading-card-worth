import CardTraderAdaptor from './clients/CardTrader/CardTraderAdaptor'
import { ENV } from './env'
import GetBlueprintValueLogic from './logic/price/GetBlueprintValueLogic'
import ExpansionSorter from './logic/catalog/ExpansionSorter'
import GetExpansionsLogic from './logic/catalog/GetExpansionsLogic'
import BlueprintValueStore, {
  IBlueprintValueStore,
} from './stores/BlueprintValueStore'
import ExpansionsStore, { IExpansionsStore } from './stores/ExpansionsStore'
import { expansionStoreMap } from './stores/expansionStoreMap'

type StoreType = {
  expansions: IExpansionsStore
  blueprintValues: IBlueprintValueStore
}

const Store: StoreType = {
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
    const expansionIds = await Store.expansions.getExpansionIds()
    await Store.blueprintValues.refreshStore(expansionIds)
  } else {
    Store.expansions.initStubbedStore()
  }
}

export default Store
