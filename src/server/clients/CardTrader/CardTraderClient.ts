import { CARD_TRADER_API_KEY, CARD_TRADER_API_URL } from './CardTraderConfig'
import { tryToParseBlueprints } from './parseBlueprints'
import { tryToParseExpansions } from './parseExpansions'

const apiKey = (): string => {
  const key = CARD_TRADER_API_KEY
  if (!key) throw new Error('Missing Card Trader Api Key')
  return key
}

const clientFetch = async <T>(path: string, parser: (data: unknown) => T) => {
  const response = await fetch(`${CARD_TRADER_API_URL}${path}`, {
    headers: { Authorization: apiKey() },
  })
  const data = (await response.json()) as unknown
  return parser(data)
}

export const getExpansions = async () => {
  return await clientFetch('/expansions', tryToParseExpansions)
}

export const getBlueprints = async (expansionId: number) => {
  return await clientFetch(
    `/blueprints/export?expansion_id=${expansionId}`,
    tryToParseBlueprints
  )
}
