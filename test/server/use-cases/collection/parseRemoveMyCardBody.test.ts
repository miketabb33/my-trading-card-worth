import { tryToParseRemoveMyCardBody } from '../../../../src/server/use-cases/collection/parseRemoveMyCardBody'

describe('Try To Parse Add My Card Body', () => {
  it('should parse', () => {
    const body = {
      blueprintId: 1234,
    }

    const result = tryToParseRemoveMyCardBody(body)

    expect(result).toEqual(body.blueprintId)
  })

  it('should throw when data is incorrect', () => {
    expect(() => tryToParseRemoveMyCardBody({})).toThrow()
  })
})
