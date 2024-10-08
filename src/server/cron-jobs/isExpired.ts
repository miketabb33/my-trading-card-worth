export type ExpiresIn = {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

type IsExpiredAfterDaysArgs = {
  expiresIn: ExpiresIn
  lastDate: Date | null
  now: Date
}

export const isExpired = ({ expiresIn, lastDate, now }: IsExpiredAfterDaysArgs) => {
  if (!lastDate) return true

  const expiration = new Date(
    lastDate.getFullYear(),
    lastDate.getMonth(),
    lastDate.getDate() + (expiresIn.days ?? 0),
    lastDate.getHours() + (expiresIn.hours ?? 0),
    lastDate.getMinutes() + (expiresIn.minutes ?? 0),
    lastDate.getSeconds() + (expiresIn.seconds ?? 0)
  )

  return expiration < now
}
