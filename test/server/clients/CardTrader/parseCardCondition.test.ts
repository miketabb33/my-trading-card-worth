import { parseCardCondition } from '../../../../src/server/clients/CardTrader/parseCardCondition'

describe(' Parse Card Condition', () => {
  it('should parse Mint into Mint', () => {
    const result = parseCardCondition('Mint')
    expect(result).toEqual('Mint')
  })

  it('should parse Near Mint into Near Mint', () => {
    const result = parseCardCondition('Near Mint')
    expect(result).toEqual('Near Mint')
  })

  it('should parse Slightly Played into Slightly Played', () => {
    const result = parseCardCondition('Slightly Played')
    expect(result).toEqual('Slightly Played')
  })

  it('should parse Moderately Played into Moderately Played', () => {
    const result = parseCardCondition('Moderately Played')
    expect(result).toEqual('Moderately Played')
  })

  it('should parse Played into Played', () => {
    const result = parseCardCondition('Played')
    expect(result).toEqual('Played')
  })

  it('should parse Heavily Played into Heavily Played', () => {
    const result = parseCardCondition('Heavily Played')
    expect(result).toEqual('Heavily Played')
  })

  it('should parse Poor into Poor', () => {
    const result = parseCardCondition('Poor')
    expect(result).toEqual('Poor')
  })

  it('should parse null into Unknown', () => {
    const result = parseCardCondition(null)
    expect(result).toEqual('Unknown')
  })

  it('should parse unsupported text into Unknown', () => {
    const result = parseCardCondition('Unsupported')
    expect(result).toEqual('Unknown')
  })
})
