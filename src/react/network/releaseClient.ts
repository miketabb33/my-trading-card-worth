import { ApplicationReleaseDto } from '@core/network-types/release'
import { useApi } from './useApi'

export const useReleaseListData = () => {
  return useApi<ApplicationReleaseDto[]>({ path: '/release/list' })
}
