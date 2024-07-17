import { StoreStatusDto } from '../../core/types/StoreStatusDto'
import { useApi } from './useApi'

export const useStoreStatus = () => {
  return useApi<StoreStatusDto>({ path: '/store/status' })
}
