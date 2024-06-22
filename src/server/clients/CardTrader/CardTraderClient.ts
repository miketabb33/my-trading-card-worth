import { ENV } from '../../env'
import { tryToParseBlueprints } from './parseBlueprints'
import { tryToParseExpansions } from './parseExpansions'
import { tryToParseMarketplaceProducts } from './parseMarketplaceProducts'

const CARD_TRADER = ENV.CARD_TRADER

const clientFetch = async <T>(path: string, parser: (data: unknown) => T) => {
  const response = await fetch(`${CARD_TRADER.CARD_TRADER_API_URL}${path}`, {
    headers: { Authorization: CARD_TRADER.CARD_TRADER_API_KEY() },
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

export const getMarketplaceProducts = async (expansionId: number) => {
  return await clientFetch(
    `/marketplace/products?expansion_id=${expansionId}`,
    tryToParseMarketplaceProducts
  )
}
