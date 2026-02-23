import { z } from 'zod'
import { CardDto } from './card'

export type CollectionMetaDto = {
  medianMarketValueCents: number
  cardsInCollection: number
}

export type CollectionDto = {
  meta: CollectionMetaDto
  cards: CardDto[]
}

export type ShareCollectionDto = {
  meta: CollectionMetaDto
  cards: CardDto[]
  name: string
}

export const AddMyCardBodySchema = z.object({
  blueprintId: z.number(),
  expansionId: z.number(),
  name: z.string(),
  imageUrlPreview: z.string(),
  imageUrlShow: z.string(),
})

export type AddMyCardBody = z.infer<typeof AddMyCardBodySchema>

export const RemoveMyCardBodySchema = z.object({
  blueprintId: z.number(),
})

export type RemoveMyCardBody = z.infer<typeof RemoveMyCardBodySchema>
