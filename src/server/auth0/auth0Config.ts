import { ConfigParams } from 'express-openid-connect'

export const auth0Config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL ?? '',
  baseURL: process.env.AUTH_BASE_URL ?? '',
  clientID: process.env.AUTH_CLIENT_ID ?? '',
  secret: process.env.AUTH_SECRET ?? '',
}
