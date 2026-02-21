import Honeybadger from '@honeybadger-io/js'

class Logger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static error = (e: any) => {
    if (e instanceof Error) {
      Honeybadger.notify(e)
    } else if (typeof e === 'string') {
      Honeybadger.notify(new Error(e))
    } else {
      Honeybadger.notify(new Error('Unknown error'), { context: { raw: e } })
    }
  }

  static info = (message: string) => {
    console.info('INFO:', message)
  }
}

export default Logger
