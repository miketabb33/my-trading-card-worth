import { ExpansionDto } from '../../core/types/ExpansionDto'
import Logger from '../logger'
import { formatError } from '../logic/formatResponse'
import { IStore } from '../stores/IStore'
import { ICronJob } from './ICronJob'
import { ExpiresIn, isExpired } from './isExpired'

class ExpansionsUpdater implements ICronJob {
  private readonly expansionsStore: IStore<ExpansionDto[]>

  constructor(expansionsStore: IStore<ExpansionDto[]>) {
    this.expansionsStore = expansionsStore
  }

  start = (expiresIn: ExpiresIn, interval: number) => {
    setInterval(() => {
      const lastDate = this.expansionsStore.getLastUpdated()
      const expired = isExpired({ expiresIn, lastDate, now: new Date() })
      if (expired) this.refreshStoreWhenTimeHasPast()
    }, interval)
  }

  private refreshStoreWhenTimeHasPast = () => {
    this.expansionsStore
      .refreshStore()
      .then(() => console.log('expansion store refreshed'))
      .catch((e) => {
        const error = formatError(e)
        Logger.error(error)
      })
  }
}

export default ExpansionsUpdater
