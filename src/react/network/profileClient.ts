import { ProfileDto } from '@core/network-types/profile'
import { useApi } from './useApi'

export const useProfileData = () => {
  return useApi<ProfileDto>({ path: '/profile' })
}
