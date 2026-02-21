import { exceptionMiddleware } from '../../../src/server/http/exceptionMiddleware'
import Logger from '../../../src/server/logger'

jest.mock('../../../src/server/logger', () => ({
  error: jest.fn(),
}))

describe('Exception Middleware', () => {
  let req: any
  let res: any
  let next: jest.Mock

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
    next = jest.fn()
  })

  it('should log the error', () => {
    const error = new Error('test error')
    exceptionMiddleware(error, req, res, next)
    expect(Logger.error).toHaveBeenCalledWith(error)
  })

  it('should return 500 status', () => {
    exceptionMiddleware(new Error('test'), req, res, next)
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should include the error name in the response', () => {
    const error = new Error('test')
    error.name = 'PrismaClientInitializationError'
    exceptionMiddleware(error, req, res, next)
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: ['An internal server error occurred. Error type: PrismaClientInitializationError'],
        isSuccessful: false,
      })
    )
  })

  it('should use Unknown type when error is not an Error instance', () => {
    exceptionMiddleware('something went wrong', req, res, next)
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: ['An internal server error occurred. Error type: Unknown'],
        isSuccessful: false,
      })
    )
  })
})
