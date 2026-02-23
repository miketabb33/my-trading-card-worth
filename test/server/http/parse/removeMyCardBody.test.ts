import { parseRemoveMyCardBody } from '../../../../src/server/http/parse/removeMyCardBody'

describe('parseRemoveMyCardBody', () => {
  it('should parse', () => {
    const body = { blueprintId: 1234 }

    const result = parseRemoveMyCardBody(body)

    expect(result).toEqual(body.blueprintId)
  })

  it('should throw when data is incorrect', () => {
    expect(() => parseRemoveMyCardBody({})).toThrow()
  })
})
