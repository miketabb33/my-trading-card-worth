import { formatCentsToDollars } from '../../src/core/currencyFormatter'

describe('Currency Formatter', () => {
  it('should format 0 cents', () => {
    expect(formatCentsToDollars(0)).toEqual('$0.00')
  })
  it('should format negative cents', () => {
    expect(formatCentsToDollars(-111)).toEqual('-$1.11')
  })
  it('should format 1', () => {
    expect(formatCentsToDollars(1)).toEqual('$0.01')
  })
  it('should format 25', () => {
    expect(formatCentsToDollars(25)).toEqual('$0.25')
  })
  it('should format 111', () => {
    expect(formatCentsToDollars(111)).toEqual('$1.11')
  })
  it('should format 12345', () => {
    expect(formatCentsToDollars(12345)).toEqual('$123.45')
  })
  it('should format 9405938572', () => {
    expect(formatCentsToDollars(9405938572)).toEqual('$94,059,385.72')
  })
})
