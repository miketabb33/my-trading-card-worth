import { z } from 'zod'

const CardTraderBlueprintSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    version: z.string().nullable(),
    game_id: z.number(),
    category_id: z.number(),
    expansion_id: z.number(),
    fixed_properties: z
      .object({
        collector_number: z.string().optional().default(''),
        pokemon_rarity: z.string().optional().default(''),
      })
      .optional(),
    image: z
      .object({
        show: z.object({ url: z.string() }).optional(),
        preview: z.object({ url: z.string() }).optional(),
      })
      .optional(),
  })
  .transform((parsed) => ({
    id: parsed.id,
    name: parsed.name,
    version: parsed.version,
    gameId: parsed.game_id,
    categoryId: parsed.category_id,
    expansionId: parsed.expansion_id,
    fixedProperties: {
      collectorNumber: parsed.fixed_properties?.collector_number ?? '',
      pokemonRarity: parsed.fixed_properties?.pokemon_rarity ?? '',
    },
    image: {
      show: { url: parsed.image?.show?.url ?? '' },
      preview: { url: parsed.image?.preview?.url ?? '' },
    },
  }))

export type CardTraderBlueprintDto = z.infer<typeof CardTraderBlueprintSchema>

export const tryToParseBlueprints = (data: unknown): CardTraderBlueprintDto[] =>
  z.array(CardTraderBlueprintSchema).parse(data)
