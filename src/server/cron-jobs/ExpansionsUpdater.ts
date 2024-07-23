import { IExpansionsStore } from '../stores/ExpansionsStore'
import { ExpiresIn, isExpiredAfterDays } from './isExpiredAfterDays'

class ExpansionsUpdater {
  private readonly expansionsStore: IExpansionsStore

  constructor(expansionsStore: IExpansionsStore) {
    this.expansionsStore = expansionsStore
  }
  startCronJob = (expiresIn: ExpiresIn, interval: number) => {
    setInterval(() => {
      if (
        isExpiredAfterDays({
          expiresIn,
          lastDate: this.expansionsStore.getLastUpdated(),
        })
      )
        this.refreshStoreWhenTimeHasPast()
    }, interval)
  }

  private refreshStoreWhenTimeHasPast = () => {
    this.expansionsStore
      .refreshStore()
      .then(() => console.log('expansion store refreshed'))
      .catch(console.dir)
  }
}

export default ExpansionsUpdater
