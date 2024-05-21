import { CardSetDto } from '../../core/types/CardSetDto'
import { useApi } from './useApi'

export const useSets = () => {
  return useApi<CardSetDto[]>('/sets')
}
