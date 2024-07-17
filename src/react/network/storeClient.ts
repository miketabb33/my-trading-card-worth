import { StoreStatusDto } from '../../core/types/StoreStatusDto'
import { useApi } from './useApi'

export const useStoreStatusData = () => {
  return useApi<StoreStatusDto>({ path: '/store/status' })
}
