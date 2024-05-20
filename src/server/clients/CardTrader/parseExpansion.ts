import { CardTraderExpansionDto } from './types/CardTraderExpansionDto'

export const parseExpansions = (data: unknown) => {
  return data as CardTraderExpansionDto[]
}
