import { Request, Response, NextFunction } from 'express'
import { exceptionMiddleware } from '../../../src/server/http/exceptionMiddleware'
import Logger from '../../../src/server/logger'

jest.mock('../../../src/server/logger', () => ({
  error: jest.fn(),
}))

describe('Exception Middleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let statusMock: jest.Mock
  let sendMock: jest.Mock

  beforeEach(() => {
    req = {} as Request
    statusMock = jest.fn().mockReturnThis()
    sendMock = jest.fn()
    res = { status: statusMock, send: sendMock } as unknown as Response
    next = jest.fn()
  })

  it('should log the error', () => {
    const error = new Error('test error')
    exceptionMiddleware(error, req, res, next)
    expect(jest.mocked(Logger.error)).toHaveBeenCalledWith(error)
  })

  it('should return 500 status', () => {
    exceptionMiddleware(new Error('test'), req, res, next)
    expect(statusMock).toHaveBeenCalledWith(500)
  })

  it('should include the error name in the response', () => {
    const error = new Error('test')
    error.name = 'PrismaClientInitializationError'
    exceptionMiddleware(error, req, res, next)
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: ['An internal server error occurred. Error type: PrismaClientInitializationError'],
        isSuccessful: false,
      })
    )
  })

  it('should use Unknown type when error is not an Error instance', () => {
    exceptionMiddleware('something went wrong', req, res, next)
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: ['An internal server error occurred. Error type: Unknown'],
        isSuccessful: false,
      })
    )
  })
})
