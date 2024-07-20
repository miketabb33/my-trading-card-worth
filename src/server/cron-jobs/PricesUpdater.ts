import { IBlueprintValueStore } from '../stores/BlueprintValueStore'
import { IExpansionsStore } from '../stores/ExpansionsStore'
import { isExpiredAfterDays, oneHourInMilliseconds } from './cronJobCommon'

class PricesUpdater {
  private readonly blueprintValueStore: IBlueprintValueStore
  private readonly expansionsStore: IExpansionsStore

  constructor(
    blueprintValueStore: IBlueprintValueStore,
    expansionStore: IExpansionsStore
  ) {
    this.blueprintValueStore = blueprintValueStore
    this.expansionsStore = expansionStore
  }
  startCronJob = (daysUntilRefresh: number) => {
    setInterval(() => {
      if (
        isExpiredAfterDays(
          daysUntilRefresh,
          this.blueprintValueStore.getLastUpdated()
        )
      )
        this.refreshStoreWhenTimeHasPast()
    }, oneHourInMilliseconds * 4)
  }

  private refreshStoreWhenTimeHasPast = () => {
    this.expansionsStore
      .getExpansionIds()
      .then((expansionIds) => {
        this.blueprintValueStore
          .refreshStore(expansionIds)
          .then(() => console.log('expansion store refreshed'))
          .catch(console.dir)
      })
      .catch(console.dir)
  }
}

export default PricesUpdater
