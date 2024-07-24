import { ExpansionDto } from '../../core/types/ExpansionDto'
import { IStore } from '../stores/IStore'
import { ExpiresIn, isExpiredAfterDays } from './isExpiredAfterDays'

class ExpansionsUpdater {
  private readonly expansionsStore: IStore<ExpansionDto[]>

  constructor(expansionsStore: IStore<ExpansionDto[]>) {
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
