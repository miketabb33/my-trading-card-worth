import { ProfileDto } from '../../core/types/ProfileDto'
import { useApi } from './useApi'

export const useProfileData = () => {
  return useApi<ProfileDto>('/profile')
}
