export const validatedEnv = (variable?: string) => {
  if (!variable) throw new Error('Missing Environment Variable')
  return variable
}

type EnvironmentId = 'production' | 'development'

export const ENV = {
  AUTH_0: {
    ISSUER_BASE_URL: () => validatedEnv(process.env.AUTH_ISSUER_BASE_URL),
    BASE_URL: () => validatedEnv(process.env.AUTH_BASE_URL),
    CLIENT_ID: () => validatedEnv(process.env.AUTH_CLIENT_ID),
    SECRET: () => validatedEnv(process.env.AUTH_SECRET),
  },
  CARD_TRADER: {
    CARD_TRADER_API_KEY: () => validatedEnv(process.env.CARD_TRADER_API_KEY),
    CARD_TRADER_BASE_URL: 'https://cardtrader.com',
    CARD_TRADER_API_URL: 'https://api.cardtrader.com/api/v2',
    POKEMON_GAME_ID: 5,
    POKEMON_SINGLE_CARD_CATEGORY: 73,
  },
  MONGO: {
    CONNECTION_STRING: () => validatedEnv(process.env.MONGODB_CONNECTION_STRING),
  },
  ID: process.env.NODE_ENV as EnvironmentId,
}
