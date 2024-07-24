import ExpansionsUpdater from './cron-jobs/ExpansionsUpdater'
import PricesUpdater from './cron-jobs/PricesUpdater'
import { ENV } from './env'
import Store from './StoreRegistry'

const oneSecondInMilliseconds = 1_000
const oneMinuteInMilliseconds = oneSecondInMilliseconds * 60
const oneHourInMilliseconds = oneMinuteInMilliseconds * 60

export const startCronJobs = () => {
  const pricesUpdater = new PricesUpdater(Store.blueprintValues)
  const expansionUpdater = new ExpansionsUpdater(Store.expansions)

  if (ENV.ID === 'production') {
    const fourHours = oneHourInMilliseconds * 4
    pricesUpdater.startCronJob({ days: 4 }, fourHours)
    expansionUpdater.startCronJob({ days: 2 }, fourHours)
  } else {
    const thirtySeconds = oneSecondInMilliseconds * 30
    pricesUpdater.startCronJob({ minutes: 2 }, thirtySeconds)
    expansionUpdater.startCronJob({ minutes: 1 }, thirtySeconds)
  }
}
