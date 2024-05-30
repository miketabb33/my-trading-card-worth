import { ProfileContextType } from '../../src/react/providers/ProfileProvider'

export const PROFILE_CONTEXT_TYPE: ProfileContextType = {
  profile: null,
  isLoading: false,
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
}
