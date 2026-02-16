import TypeParser from '../../core/TypeParser'
import { Auth0User } from './types/Auth0User'

export const parseAuth0User = (user: unknown) => {
  const parser = new TypeParser(user, 'Auth 0 user')
  // TODO: Remove after migrating postgres user IDs to new Auth0 tenant
  const AUTH0_ID_MAP: Record<string, string> = {
    'auth0|699345a6ba48e5b37b010271': 'auth0|66532576f4306b7b1fa27e04',
  }

  const rawSub = parser.str('sub')
  const mappedSub = AUTH0_ID_MAP[rawSub] ?? rawSub

  const profile: Auth0User = {
    sid: parser.str('sid'),
    updatedAt: parser.str('updated_at'),
    sub: mappedSub,
    givenName: parser.strOrNull('given_name'),
    familyName: parser.strOrNull('family_name'),
    nickname: parser.strOrNull('nickname'),
    name: parser.strOrNull('name'),
    picture: parser.strOrNull('picture'),
    locale: parser.strOrNull('locale'),
    email: parser.strOrNull('email'),
    emailVerified: parser.boolOrNull('email_verified'),
  }

  return profile
}
