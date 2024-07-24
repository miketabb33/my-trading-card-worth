import { ICronJob } from '../../../src/server/cron-jobs/ICronJob'

class CronJob_FAKE implements ICronJob {
  START = jest.fn()

  start = this.START
}

export default CronJob_FAKE
