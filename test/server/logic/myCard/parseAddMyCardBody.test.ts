import { tryToParseAddMyCardBody } from '../../../../src/server/logic/myCard/parseAddMyCardBody'

describe('Try To Parse Add My Card Body', () => {
  it('should parse', () => {
    const body = {
      cardTraderBlueprintId: 123,
      cardTraderExpansionId: 456,
      name: 'Any',
      condition: 1,
      imageUrlPreview: 'preview',
      imageUrlShow: 'show',
    }

    const result = tryToParseAddMyCardBody(body)

    expect(result.cardTraderBlueprintId).toEqual(body.cardTraderBlueprintId)
    expect(result.cardTraderExpansionId).toEqual(body.cardTraderExpansionId)
    expect(result.name).toEqual(body.name)
    expect(result.condition).toEqual(body.condition)
    expect(result.imageUrlPreview).toEqual(body.imageUrlPreview)
    expect(result.imageUrlShow).toEqual(body.imageUrlShow)
  })

  it('should throw when data is incorrect', () => {
    expect(() => tryToParseAddMyCardBody({})).toThrow()
  })
})
