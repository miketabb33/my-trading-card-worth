export const formatCentsToDollars = (cents: number): string => {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
