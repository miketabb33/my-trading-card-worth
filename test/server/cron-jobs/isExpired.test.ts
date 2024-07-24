import { ExpiresIn, isExpired } from '../../../src/server/cron-jobs/isExpired'

describe('Is Expired', () => {
  it('should return true when last updated is null', () => {
    const expiresIn: ExpiresIn = {}
    const lastDate: Date | null = null
    const now: Date = new Date()

    expect(isExpired({ expiresIn, lastDate, now })).toEqual(true)
  })

  it('should return true when now is past last updated by the expired time', () => {
    const expiresIn: ExpiresIn = { days: 1, hours: 1, minutes: 1, seconds: 1 }
    const lastDate: Date | null = new Date(1990, 1, 13, 10, 5, 0)
    const now: Date = new Date(1990, 1, 14, 11, 6, 30)

    expect(isExpired({ expiresIn, lastDate, now })).toEqual(true)
  })

  it('should return false when now is NOT past last updated by the expired time', () => {
    const expiresIn: ExpiresIn = { days: 1, hours: 1, minutes: 1, seconds: 1 }
    const lastDate: Date | null = new Date(1990, 1, 13, 10, 5, 5)
    const now: Date = new Date(1990, 1, 14, 11, 6, 5)

    expect(isExpired({ expiresIn, lastDate, now })).toEqual(false)
  })
})
