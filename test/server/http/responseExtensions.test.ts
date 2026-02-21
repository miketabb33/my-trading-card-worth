import { Request, Response, NextFunction } from 'express'
import { responseExtensions } from '../../../src/server/http/responseExtensions'

describe('Response Extensions', () => {
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
    responseExtensions(req, res, next)
  })

  it('should call next', () => {
    expect(jest.mocked(next)).toHaveBeenCalled()
  })

  describe('sendData', () => {
    it('should send data with 200 status by default', () => {
      res.sendData({ data: { foo: 'bar' } })
      expect(statusMock).toHaveBeenCalledWith(200)
      expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({ data: { foo: 'bar' }, isSuccessful: true }))
    })

    it('should send data with a custom status', () => {
      res.sendData({ data: { foo: 'bar' }, status: 201 })
      expect(statusMock).toHaveBeenCalledWith(201)
    })
  })

  describe('sendError', () => {
    it('should send errors with 400 status by default', () => {
      res.sendError({ errors: ['bad request'] })
      expect(statusMock).toHaveBeenCalledWith(400)
      expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({ errors: ['bad request'], isSuccessful: false }))
    })

    it('should send errors with a custom status', () => {
      res.sendError({ errors: ['not found'], status: 404 })
      expect(statusMock).toHaveBeenCalledWith(404)
    })
  })

  describe('sendSuccess', () => {
    it('should send success with 200 status by default', () => {
      res.sendSuccess()
      expect(statusMock).toHaveBeenCalledWith(200)
      expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({ data: null, errors: null, isSuccessful: true }))
    })

    it('should send success with a custom status', () => {
      res.sendSuccess({ status: 201 })
      expect(statusMock).toHaveBeenCalledWith(201)
    })
  })
})
