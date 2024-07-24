import { IStore } from '../stores/IStore'
import { BlueprintValue } from '../types/BlueprintValue'
import { ExpiresIn, isExpiredAfterDays } from './isExpiredAfterDays'

class PricesUpdater {
  private readonly blueprintValueStore: IStore<Map<string, BlueprintValue>>

  constructor(blueprintValueStore: IStore<Map<string, BlueprintValue>>) {
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
      .then(() => console.log('price store refreshed'))
      .catch(console.dir)
  }
}

export default PricesUpdater
