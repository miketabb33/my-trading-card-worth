import { formatResponse } from '../../../src/server/http/formatResponse'

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
