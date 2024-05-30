import { tryToParseAddMyCardBody } from '../../../../src/server/controllers/myCard/parseAddMyCardBody'

describe('Try To Parse Add My Card Body', () => {
  it('should parse', () => {
    const body = {
      cardTraderId: 123,
      name: 'Any',
      condition: 1,
    }

    const result = tryToParseAddMyCardBody(body)

    expect(result.cardTraderId).toEqual(body.cardTraderId)
    expect(result.name).toEqual(body.name)
    expect(result.condition).toEqual(body.condition)
  })

  it('should throw when data is incorrect', () => {
    expect(() => tryToParseAddMyCardBody({})).toThrow()
  })
})
