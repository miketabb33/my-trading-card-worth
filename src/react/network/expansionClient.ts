import { CatalogDto } from '../../core/types/CatalogDto'
import { ExpansionDto } from '../../core/types/ExpansionDto'
import { fetchApi } from './fetchApi'
import { useApi } from './useApi'

export const useExpansionsData = () => {
  return useApi<ExpansionDto[]>('/sets')
}

export const fetchExpansion = (setId: number) => {
  return fetchApi<CatalogDto>({ path: `/sets/${setId}` })
}
