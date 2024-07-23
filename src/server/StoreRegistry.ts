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

export class StoreRegistry {
  expansions: IExpansionsStore
  blueprintValues: IBlueprintValueStore

  constructor(
    expansions: IExpansionsStore,
    blueprintValues: IBlueprintValueStore
  ) {
    this.expansions = expansions
    this.blueprintValues = blueprintValues
  }

  init = async () => {
    if (ENV.ID === 'production') {
      await Store.expansions.refreshStore()
      await Store.blueprintValues.refreshStore()
    } else {
      Store.expansions.initStubbedStore()
    }
  }
}

const expansionsStore = new ExpansionsStore(
  new GetExpansionsLogic(
    new CardTraderAdaptor(),
    new ExpansionSorter(),
    expansionStoreMap
  )
)

const blueprintValueStore = new BlueprintValueStore(
  new GetBlueprintValueLogic(new CardTraderAdaptor()),
  expansionsStore
)

const Store = new StoreRegistry(expansionsStore, blueprintValueStore)

export default Store
