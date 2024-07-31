import Logger from '../logger'
import { formatError } from '../logic/formatResponse'
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
      .then(() => Logger.info('price store refreshed'))
      .catch((e) => {
        Logger.info('Error occurred in price updater cron job')
        const error = formatError(e)
        Logger.error(error)
      })
  }
}

export default PricesUpdater
