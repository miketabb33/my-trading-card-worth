import { SetDto } from '../../core/types/CardBlueprintDto'
import { CardSetDto } from '../../core/types/CardSetDto'
import { fetchApi } from './fetchApi'
import { useApi } from './useApi'

export const useSetsData = () => {
  return useApi<CardSetDto[]>('/sets')
}

export const fetchSet = (setId: number) => {
  return fetchApi<SetDto>({ path: `/sets/${setId}` })
}
