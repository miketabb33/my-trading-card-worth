import Honeybadger from '@honeybadger-io/js'

class Logger {
  static error = (error: Error) => {
    Honeybadger.notify(error)
  }

  static info = (message: string) => {
    console.info('INFO:', message)
  }
}

export default Logger
