class Logger {
  static error = (error: Error) => {
    console.error('ERROR:', error)
  }

  static info = (message: string) => {
    console.info('INFO:', message)
  }
}

export default Logger
