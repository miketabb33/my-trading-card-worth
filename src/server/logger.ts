class Logger {
  static error = (error: Error) => {
    console.error('ERROR:', error)
  }
}

export default Logger
