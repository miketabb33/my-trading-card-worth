import { CardBlueprintDto } from '../../core/types/CardBlueprintDto'
import { CardSetDto } from '../../core/types/CardSetDto'
import { fetchApi } from './fetchApi'
import { useApi } from './useApi'

export const useSetsData = () => {
  return useApi<CardSetDto[]>('/sets')
}

export const fetchSet = (setId: number) => {
  return fetchApi<CardBlueprintDto[]>({ path: `/sets/${setId}` })
}
