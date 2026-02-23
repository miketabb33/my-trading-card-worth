import { CatalogDto, ExpansionDto } from '@core/network-types/catalog'
import { fetchApi } from './fetchApi'
import { useApi } from './useApi'

export const useExpansionsData = () => {
  return useApi<ExpansionDto[]>({ path: '/catalog' })
}

export const fetchCatalog = (expansionId: number) => {
  return fetchApi<CatalogDto>({ path: `/catalog/${expansionId}` })
}
