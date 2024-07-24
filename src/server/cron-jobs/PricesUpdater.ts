import { IStore } from '../stores/IStore'
import { BlueprintValue } from '../types/BlueprintValue'
import { ICronJob } from './ICronJob'
import { ExpiresIn, isExpired } from './isExpired'

class PricesUpdater implements ICronJob {
  private readonly blueprintValueStore: IStore<Map<string, BlueprintValue>>

  constructor(blueprintValueStore: IStore<Map<string, BlueprintValue>>) {
    this.blueprintValueStore = blueprintValueStore
  }

  start = (expiresIn: ExpiresIn, interval: number) => {
    setInterval(() => {
      const lastDate = this.blueprintValueStore.getLastUpdated()
      const expired = isExpired({ expiresIn, lastDate, now: new Date() })
      if (expired) this.refreshStoreWhenTimeHasPast()
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
