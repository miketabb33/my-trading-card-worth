import ExpansionsUpdater from './cron-jobs/ExpansionsUpdater'
import PricesUpdater from './cron-jobs/PricesUpdater'
import Store from './StoreRegistry'

const oneSecondInMilliseconds = 1_000
const oneMinuteInMilliseconds = oneSecondInMilliseconds * 60
const oneHourInMilliseconds = oneMinuteInMilliseconds * 60
const fourHours = oneHourInMilliseconds * 4

export const startCronJobs = () => {
  const pricesUpdater = new PricesUpdater(Store.blueprintValues)
  const expansionUpdater = new ExpansionsUpdater(Store.expansions)

  pricesUpdater.startCronJob({ days: 4 }, fourHours)
  expansionUpdater.startCronJob({ days: 2 }, fourHours)
}
