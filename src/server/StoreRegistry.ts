import CardTraderAdaptor from './clients/CardTrader/CardTraderAdaptor'
import { ENV } from './env'
import GetBlueprintValueLogic from './logic/price/GetBlueprintValueLogic'
import ExpansionSorter from './logic/catalog/ExpansionSorter'
import GetExpansionsLogic from './logic/catalog/GetExpansionsLogic'
import BlueprintValueStore from './stores/BlueprintValueStore'
import ExpansionsStore from './stores/ExpansionsStore'
import { expansionStoreMap } from './stores/expansionStoreMap'
import { IStore } from './stores/IStore'
import { BlueprintValue } from './types/BlueprintValue'
import { ExpansionDto } from '../core/types/ExpansionDto'
import ExpansionsStoreDev from './stores/ExpansionsStoreDev'
import BlueprintValueStoreDev from './stores/BlueprintValueStoreDev'

export class StoreRegistry {
  expansions: IStore<ExpansionDto[]>
  blueprintValues: IStore<Map<string, BlueprintValue>>

  constructor(
    expansions: IStore<ExpansionDto[]>,
    blueprintValues: IStore<Map<string, BlueprintValue>>
  ) {
    this.expansions = expansions
    this.blueprintValues = blueprintValues
  }

  init = async () => {
    await Store.expansions.refreshStore()
    await Store.blueprintValues.refreshStore()
  }
}

const getStore = () => {
  if (ENV.ID === 'production') {
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

    return new StoreRegistry(expansionsStore, blueprintValueStore)
  } else {
    return new StoreRegistry(
      new ExpansionsStoreDev(),
      new BlueprintValueStoreDev()
    )
  }
}

const Store = getStore()

export default Store
