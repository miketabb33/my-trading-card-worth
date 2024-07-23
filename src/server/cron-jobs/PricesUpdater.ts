import { IBlueprintValueStore } from '../stores/BlueprintValueStore'
import { ExpiresIn, isExpiredAfterDays } from './isExpiredAfterDays'

class PricesUpdater {
  private readonly blueprintValueStore: IBlueprintValueStore

  constructor(blueprintValueStore: IBlueprintValueStore) {
    this.blueprintValueStore = blueprintValueStore
  }
  startCronJob = (expiresIn: ExpiresIn, interval: number) => {
    setInterval(() => {
      if (
        isExpiredAfterDays({
          expiresIn,
          lastDate: this.blueprintValueStore.getLastUpdated(),
        })
      )
        this.refreshStoreWhenTimeHasPast()
    }, interval)
  }

  private refreshStoreWhenTimeHasPast = () => {
    this.blueprintValueStore
      .refreshStore()
      .then(() => console.log('expansion store refreshed'))
      .catch(console.dir)
  }
}

export default PricesUpdater
