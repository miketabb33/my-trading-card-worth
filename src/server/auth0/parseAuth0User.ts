import TypeParser from '../../core/TypeParser'
import { Auth0User } from './types/Auth0User'

export const parseAuth0User = (user: unknown) => {
  const parser = new TypeParser(user, 'Auth 0 user')
  const profile: Auth0User = {
    sid: parser.str('sid'),
    updatedAt: parser.str('updated_at'),
    sub: parser.str('sub'),
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
