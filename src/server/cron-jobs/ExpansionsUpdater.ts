import { IExpansionsStore } from '../stores/ExpansionsStore'
import { isExpiredAfterDays, oneHourInMilliseconds } from './cronJobCommon'

class ExpansionsUpdater {
  private expansionsStore: IExpansionsStore

  constructor(expansionsStore: IExpansionsStore) {
    this.expansionsStore = expansionsStore
  }
  startCronJob = (daysUntilRefresh: number) => {
    setInterval(() => {
      if (
        isExpiredAfterDays(
          daysUntilRefresh,
          this.expansionsStore.getLastUpdated()
        )
      )
        this.refreshStoreWhenTimeHasPast()
    }, oneHourInMilliseconds * 4)
  }

  private refreshStoreWhenTimeHasPast = () => {
    this.expansionsStore
      .refreshStore()
      .then(() => console.log('expansion store refreshed'))
      .catch(console.dir)
  }
}

export default ExpansionsUpdater
