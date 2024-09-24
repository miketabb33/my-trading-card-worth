import { CronJobRegistry } from '../../src/server/CronJobRegistry'
import { ENV } from '../../src/server/env'
import CronJob_FAKE from './__FAKES__/CronJob.fake'

describe('Cron Job Registry', () => {
  let cronJobRegistry: CronJobRegistry
  let pricesUpdater_FAKE: CronJob_FAKE
  let expansionUpdater_FAKE: CronJob_FAKE

  beforeEach(() => {
    pricesUpdater_FAKE = new CronJob_FAKE()
    expansionUpdater_FAKE = new CronJob_FAKE()
    cronJobRegistry = new CronJobRegistry(pricesUpdater_FAKE, expansionUpdater_FAKE)
  })

  it('should start with production settings', () => {
    ENV.ID = 'production'
    cronJobRegistry.start()
    expect(pricesUpdater_FAKE.START).toHaveBeenCalledWith({ days: 4 }, 14_400_000)
    expect(expansionUpdater_FAKE.START).toHaveBeenCalledWith({ days: 2 }, 14_400_000)
  })

  it('should start with dev settings', () => {
    ENV.ID = 'development'
    cronJobRegistry.start()
    expect(pricesUpdater_FAKE.START).toHaveBeenCalledWith({ minutes: 2 }, 30_000)
    expect(expansionUpdater_FAKE.START).toHaveBeenCalledWith({ seconds: 45 }, 30_000)
  })
})
