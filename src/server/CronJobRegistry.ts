import ExpansionsUpdater from './cron-jobs/ExpansionsUpdater'
import PricesUpdater from './cron-jobs/PricesUpdater'
import Store from './StoreRegistry'

export const startCronJobs = () => {
  const pricesUpdater = new PricesUpdater(
    Store.blueprintValues,
    Store.expansions
  )
  pricesUpdater.startCronJob(4)

  const expansionUpdater = new ExpansionsUpdater(Store.expansions)
  expansionUpdater.startCronJob(2)
}
