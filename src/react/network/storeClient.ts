import { StoreStatusDto } from '@core/network-types/store'
import { useApi } from './useApi'

export const useStoreStatusData = () => {
  return useApi<StoreStatusDto>({ path: '/store/status' })
}
