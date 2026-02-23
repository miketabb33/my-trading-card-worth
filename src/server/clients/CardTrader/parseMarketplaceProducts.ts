import { z } from 'zod'

const CardTraderMarketplaceProductSchema = z
  .object({
    blueprint_id: z.number(),
    price: z.object({ cents: z.number() }),
    properties_hash: z.object({ condition: z.string().nullable() }),
  })
  .transform((parsed) => ({
    blueprintId: parsed.blueprint_id,
    price: { cents: parsed.price.cents },
    propertiesHash: { condition: parsed.properties_hash.condition },
  }))

export type CardTraderMarketplaceProductDto = z.infer<typeof CardTraderMarketplaceProductSchema>

export const tryToParseMarketplaceProducts = (data: unknown): Map<string, CardTraderMarketplaceProductDto[]> => {
  const record = z.record(z.string(), z.array(CardTraderMarketplaceProductSchema)).parse(data)
  return new Map(Object.entries(record))
}
