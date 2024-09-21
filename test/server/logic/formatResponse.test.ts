import { formatError, formatResponse } from '../../../src/server/logic/formatResponse'

describe('Format Response', () => {
  it('should build data response correctly', () => {
    const data = { test: 'yes' }
    const response = formatResponse({ data })
    expect(response.data).toEqual(data)
    expect(response.errors).toEqual(null)
    expect(response.isSuccessful).toEqual(true)
  })

  it('should build errors response correctly', () => {
    const errors = ['error']
    const response = formatResponse({ errors })
    expect(response.data).toEqual(null)
    expect(response.errors).toEqual(errors)
    expect(response.isSuccessful).toEqual(false)
  })

  it('should build no errors and no data response correctly', () => {
    const response = formatResponse({})
    expect(response.data).toEqual(null)
    expect(response.errors).toEqual(null)
    expect(response.isSuccessful).toEqual(true)
  })
})

describe('Format Error', () => {
  it('should return a new error object when given a string', () => {
    const stringValue = 'This is an error string'
    const error = formatError(stringValue)
    expect(error.message).toEqual(stringValue)
    expect(error.name).toEqual('Error')
    expect(error.stack).toBeDefined()
  })

  it('should return the same error object when given an error object', () => {
    const errorObject = new Error('This is an error object')
    const error = formatError(errorObject)
    expect(error.message).toEqual(errorObject.message)
    expect(error.name).toEqual('Error')
    expect(error.stack).toBeDefined()
  })

  it('should return an unknown error when given something other than a string or error object', () => {
    const unknownError = formatError(0)
    expect(unknownError.message).toEqual('Unknown Error')
    expect(unknownError.name).toEqual('Error')
    expect(unknownError.stack).toBeDefined()
  })
})
