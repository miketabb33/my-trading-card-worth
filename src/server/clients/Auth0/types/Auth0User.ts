export type Auth0User = {
  sid: string
  givenName: string | null
  familyName: string | null
  nickname: string | null
  name: string | null
  picture: string | null
  locale: string | null
  updatedAt: string
  email: string | null
  emailVerified: boolean | null
  sub: string
}
