import CardTraderAdaptor from './clients/CardTrader/CardTraderAdaptor'
import GetExpansionBlueprintValueLogic from './logic/price/GetExpansionBlueprintValueLogic'
import ExpansionSorter from './logic/set/ExpansionSorter'
import GetSetsLogic from './logic/set/GetSetsLogic'
import BlueprintValueStore from './stores/BlueprintValueStore'
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
  blueprintValues: new BlueprintValueStore(
    new GetExpansionBlueprintValueLogic(new CardTraderAdaptor())
  ),
}

export const initStores = async () => {
  await Store.sets.initStore()
  const expansionIds = (await Store.sets.get()).map(
    (set) => set.cardTraderExpansionId
  )
  await Store.blueprintValues.initStore(expansionIds)
}

export default Store
