import { responseExtensions } from '../../../src/server/http/responseExtensions'

describe('Response Extensions', () => {
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
    responseExtensions(req, res, next)
  })

  it('should call next', () => {
    expect(next).toHaveBeenCalled()
  })

  describe('sendData', () => {
    it('should send data with 200 status by default', () => {
      res.sendData({ data: { foo: 'bar' } })
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({ data: { foo: 'bar' }, isSuccessful: true })
      )
    })

    it('should send data with a custom status', () => {
      res.sendData({ data: { foo: 'bar' }, status: 201 })
      expect(res.status).toHaveBeenCalledWith(201)
    })
  })

  describe('sendError', () => {
    it('should send errors with 400 status by default', () => {
      res.sendError({ errors: ['bad request'] })
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({ errors: ['bad request'], isSuccessful: false })
      )
    })

    it('should send errors with a custom status', () => {
      res.sendError({ errors: ['not found'], status: 404 })
      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe('sendSuccess', () => {
    it('should send success with 200 status by default', () => {
      res.sendSuccess()
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({ data: null, errors: null, isSuccessful: true })
      )
    })

    it('should send success with a custom status', () => {
      res.sendSuccess({ status: 201 })
      expect(res.status).toHaveBeenCalledWith(201)
    })
  })
})
