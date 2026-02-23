import { z } from 'zod'

const CardTraderExpansionSchema = z
  .object({
    id: z.number(),
    game_id: z.number(),
    code: z.string(),
    name: z.string(),
  })
  .transform((parsed) => ({
    id: parsed.id,
    gameId: parsed.game_id,
    code: parsed.code,
    name: parsed.name,
  }))

export type CardTraderExpansionDto = z.infer<typeof CardTraderExpansionSchema>

export const tryToParseExpansions = (data: unknown): CardTraderExpansionDto[] =>
  z.array(CardTraderExpansionSchema).parse(data)
