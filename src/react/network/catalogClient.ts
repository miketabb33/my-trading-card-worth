import { CatalogDto } from '../../core/types/CatalogDto'
import { ExpansionDto } from '../../core/types/ExpansionDto'
import { fetchApi } from './fetchApi'
import { useApi } from './useApi'

export const useExpansionsData = () => {
  return useApi<ExpansionDto[]>({ path: '/catalog' })
}

export const fetchCatalog = (expansionId: number) => {
  return fetchApi<CatalogDto>({ path: `/catalog/${expansionId}` })
}
