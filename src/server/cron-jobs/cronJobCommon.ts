const oneSecondInMilliseconds = 1_000
const oneMinuteInMilliseconds = oneSecondInMilliseconds * 60
export const oneHourInMilliseconds = oneMinuteInMilliseconds * 60

export const isExpiredAfterDays = (days: number, lastDate: Date | null) => {
  const now = new Date()

  if (!lastDate) return true

  const expiration = new Date(
    lastDate.getFullYear(),
    lastDate.getMonth(),
    lastDate.getDate() + days
  )

  return expiration < now
}
