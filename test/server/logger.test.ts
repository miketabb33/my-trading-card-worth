import Honeybadger from '@honeybadger-io/js'
import Logger from '../../src/server/logger'

const NOTIFY = jest.spyOn(Honeybadger, 'notify')

NOTIFY.mockImplementation(() => true)

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('error', () => {
    it('should notify Honeybadger with the error when given an Error', () => {
      const error = new Error('something broke')
      Logger.error(error)
      expect(NOTIFY).toHaveBeenCalledWith(error)
    })

    it('should wrap a string in an Error and notify Honeybadger', () => {
      Logger.error('something broke')
      expect(NOTIFY).toHaveBeenCalledWith(new Error('something broke'))
    })

    it('should notify Honeybadger with Unknown error and raw context when given an unknown type', () => {
      const raw = { code: 42 }
      Logger.error(raw)
      expect(NOTIFY).toHaveBeenCalledWith(new Error('Unknown error'), { context: { raw } })
    })
  })

  describe('info', () => {
    it('should log to console with INFO prefix', () => {
      const spy = jest.spyOn(console, 'info').mockImplementation(() => {})
      Logger.info('hello')
      expect(spy).toHaveBeenCalledWith('INFO:', 'hello')
      spy.mockRestore()
    })
  })
})
