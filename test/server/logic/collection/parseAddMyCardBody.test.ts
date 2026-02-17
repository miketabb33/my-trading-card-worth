import { tryToParseAddMyCardBody } from '../../../../src/server/logic/collection/parseAddMyCardBody'

describe('Try To Parse Add My Card Body', () => {
  it('should parse', () => {
    const body = {
      blueprintId: 123,
      expansionId: 456,
      name: 'Any',
      imageUrlPreview: 'preview',
      imageUrlShow: 'show',
    }

    const result = tryToParseAddMyCardBody(body)

    expect(result.blueprintId).toEqual(body.blueprintId)
    expect(result.expansionId).toEqual(body.expansionId)
    expect(result.name).toEqual(body.name)
    expect(result.imageUrlPreview).toEqual(body.imageUrlPreview)
    expect(result.imageUrlShow).toEqual(body.imageUrlShow)
  })

  it('should throw when data is incorrect', () => {
    expect(() => tryToParseAddMyCardBody({})).toThrow()
  })
})
