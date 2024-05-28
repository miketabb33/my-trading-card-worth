import { ConfigParams } from 'express-openid-connect'
import { ENV } from '../env'

export const auth0Config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: ENV.AUTH_0.ISSUER_BASE_URL(),
  baseURL: ENV.AUTH_0.BASE_URL(),
  clientID: ENV.AUTH_0.CLIENT_ID(),
  secret: ENV.AUTH_0.SECRET(),
}
