import { parseAddMyCardBody } from '../../../../src/server/http/parse/addMyCardBody'

describe('parseAddMyCardBody', () => {
  it('should parse', () => {
    const body = {
      blueprintId: 123,
      expansionId: 456,
      name: 'Any',
      imageUrlPreview: 'preview',
      imageUrlShow: 'show',
    }

    const result = parseAddMyCardBody(body)

    expect(result.blueprintId).toEqual(body.blueprintId)
    expect(result.expansionId).toEqual(body.expansionId)
    expect(result.name).toEqual(body.name)
    expect(result.imageUrlPreview).toEqual(body.imageUrlPreview)
    expect(result.imageUrlShow).toEqual(body.imageUrlShow)
  })

  it('should throw when data is incorrect', () => {
    expect(() => parseAddMyCardBody({})).toThrow()
  })
})
