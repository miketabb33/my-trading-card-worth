import { parseAuth0User } from '../../../src/server/clients/Auth0/parseAuth0User'
import { AUTH_0_USER_UNPARSED } from './__MOCKS__/auth0User.mock'

describe('Parse Auth 0', () => {
  it('should parse Auth0 data', () => {
    const result = parseAuth0User(AUTH_0_USER_UNPARSED)
    expect(result.sid).toEqual(AUTH_0_USER_UNPARSED.sid)
    expect(result.updatedAt).toEqual(AUTH_0_USER_UNPARSED.updated_at)
    expect(result.sub).toEqual(AUTH_0_USER_UNPARSED.sub)
    expect(result.givenName).toEqual(AUTH_0_USER_UNPARSED.given_name)
    expect(result.familyName).toEqual(AUTH_0_USER_UNPARSED.family_name)
    expect(result.nickname).toEqual(AUTH_0_USER_UNPARSED.nickname)
    expect(result.name).toEqual(AUTH_0_USER_UNPARSED.name)
    expect(result.picture).toEqual(AUTH_0_USER_UNPARSED.picture)
    expect(result.locale).toEqual(AUTH_0_USER_UNPARSED.locale)
    expect(result.email).toEqual(AUTH_0_USER_UNPARSED.email)
    expect(result.emailVerified).toEqual(AUTH_0_USER_UNPARSED.email_verified)
  })
})
