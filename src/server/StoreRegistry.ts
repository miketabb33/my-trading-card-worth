import CardTraderAdaptor from './clients/CardTrader/CardTraderAdaptor'
import ExpansionSorter from './logic/set/ExpansionSorter'
import GetSetsLogic from './logic/set/GetSetsLogic'
import SetsStore from './stores/SetsStore'
import { expansionStoreMap } from './stores/expansionStoreMap'

const Store = {
  sets: new SetsStore(
    new GetSetsLogic(
      new CardTraderAdaptor(),
      new ExpansionSorter(),
      expansionStoreMap
    )
  ),
}

export const initStores = async () => {
  await Store.sets.initStore()
}

export default Store
