import { ApplicationReleaseDto } from '../../core/types/ApplicationReleaseDto'
import { useApi } from './useApi'

export const useReleaseListData = () => {
  return useApi<ApplicationReleaseDto[]>({ path: '/release/list' })
}
