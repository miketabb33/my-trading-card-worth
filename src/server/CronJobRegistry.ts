import ExpansionsUpdater from './cron-jobs/ExpansionsUpdater'
import { ICronJob } from './cron-jobs/ICronJob'
import PricesUpdater from './cron-jobs/PricesUpdater'
import { ENV } from './env'
import Store from './StoreRegistry'

const oneSecondInMilliseconds = 1_000
const oneMinuteInMilliseconds = oneSecondInMilliseconds * 60
const oneHourInMilliseconds = oneMinuteInMilliseconds * 60

export class CronJobRegistry {
  private readonly pricesUpdater: ICronJob
  private readonly expansionUpdater: ICronJob

  constructor(pricesUpdater: ICronJob, expansionsUpdater: ICronJob) {
    this.pricesUpdater = pricesUpdater
    this.expansionUpdater = expansionsUpdater
  }

  start = () => {
    if (ENV.ID === 'production') {
      const fourHours = oneHourInMilliseconds * 4
      this.pricesUpdater.start({ days: 4 }, fourHours)
      this.expansionUpdater.start({ days: 2 }, fourHours)
    } else {
      const thirtySeconds = oneSecondInMilliseconds * 30
      this.pricesUpdater.start({ minutes: 2 }, thirtySeconds)
      this.expansionUpdater.start({ seconds: 45 }, thirtySeconds)
    }
  }
}

const pricesUpdater: ICronJob = new PricesUpdater(Store.blueprintValues)
const expansionUpdater: ICronJob = new ExpansionsUpdater(Store.expansions)

const CronJobs = new CronJobRegistry(pricesUpdater, expansionUpdater)

export default CronJobs
