import { tryToParseMarketplaceProducts } from '../../../../src/server/clients/CardTrader/parseMarketplaceProducts'
import { CARD_TRADER_MARKETPLACE_PRODUCTS_RESPONSE_MOCK } from './__MOCKS__/CardTraderMarketplaceProductsResponse.mock'

describe('Try To Parse Marketplace Products', () => {
  it('should parse response', () => {
    const result = tryToParseMarketplaceProducts(
      CARD_TRADER_MARKETPLACE_PRODUCTS_RESPONSE_MOCK
    )
    expect(result.size).toEqual(4)
    expect(result.has('287134')).toEqual(true)
    expect(result.has('287805')).toEqual(true)
    expect(result.has('287825')).toEqual(true)
    expect(result.has('287608')).toEqual(true)

    expect(result.get('287805')![0].blueprintId).toEqual(287805)
    expect(result.get('287805')![0].price.cents).toEqual(11)
    expect(result.get('287805')![0].propertiesHash.condition).toEqual(
      'Near Mint'
    )
  })

  it('should throw when response is not object', () => {
    expect(() => tryToParseMarketplaceProducts('invalid')).toThrow()
  })

  it('should throw when object value is not an array', () => {
    expect(() => tryToParseMarketplaceProducts({ foo: 'bar' })).toThrow()
  })

  it('should throw when object value array item is missing blueprint id', () => {
    expect(() =>
      tryToParseMarketplaceProducts({ foo: [{ foo: 'bar' }] })
    ).toThrow()
  })

  it('should throw when object value array item is missing price', () => {
    expect(() =>
      tryToParseMarketplaceProducts({ foo: [{ blueprint_id: 123 }] })
    ).toThrow()
  })

  it('should throw when cents is a string', () => {
    expect(() =>
      tryToParseMarketplaceProducts({
        foo: [{ blueprint_id: 123, price: { cents: '33' } }],
      })
    ).toThrow()
  })
})
