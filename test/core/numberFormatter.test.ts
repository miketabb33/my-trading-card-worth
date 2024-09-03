import { formatWithCommas } from '../../src/core/numberFormatter'

describe('Number Formatter', () => {
  it('should format 0', () => {
    expect(formatWithCommas(0)).toEqual('0')
  })
  it('should NOT format 3 numbers', () => {
    expect(formatWithCommas(100)).toEqual('100')
  })
  it('should format 4 numbers', () => {
    expect(formatWithCommas(5555)).toEqual('5,555')
  })
  it('should format 7 number', () => {
    expect(formatWithCommas(1234567)).toEqual('1,234,567')
  })
})
