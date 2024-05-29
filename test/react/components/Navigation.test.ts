import { renderHook } from '@testing-library/react'
import { useInNavigation } from '../../../src/react/components/Navigation'
import * as ProfileProviderModule from '../../../src/react/providers/ProfileProvider'
import { ProfileDto } from '../../../src/core/types/ProfileDto'

const USE_PROFILE = jest.spyOn(ProfileProviderModule, 'useProfile')

const LOGOUT = jest.fn()
const LOGIN = jest.fn()

const PROFILE_RETURN: ProfileProviderModule.ProfileContextType = {
  profile: null,
  isLoading: false,
  logout: LOGOUT,
  login: LOGIN,
}

const PROFILE: ProfileDto = {
  userId: '',
  name: '',
  nickname: '',
  email: null,
  picture: null,
}

beforeEach(jest.clearAllMocks)

describe('Use In Navigation', () => {
  it('should return loading true', () => {
    USE_PROFILE.mockReturnValue({ ...PROFILE_RETURN, isLoading: true })

    const { result } = renderHook(useInNavigation)
    expect(result.current.showLoading).toEqual(true)
    expect(result.current.showLoggedIn).toEqual(false)
    expect(result.current.showLoggedOut).toEqual(false)
    expect(result.current.profile).toBeNull()
  })

  it('should show logged in when not loading and profile exists', () => {
    USE_PROFILE.mockReturnValue({
      ...PROFILE_RETURN,
      isLoading: false,
      profile: PROFILE,
    })

    const { result } = renderHook(useInNavigation)
    expect(result.current.showLoading).toEqual(false)
    expect(result.current.showLoggedIn).toEqual(true)
    expect(result.current.showLoggedOut).toEqual(false)
    expect(result.current.profile).toEqual(PROFILE)
  })

  it('should show logged out when not loading and profile is null', () => {
    USE_PROFILE.mockReturnValue({
      ...PROFILE_RETURN,
      isLoading: false,
      profile: null,
    })

    const { result } = renderHook(useInNavigation)
    expect(result.current.showLoading).toEqual(false)
    expect(result.current.showLoggedIn).toEqual(false)
    expect(result.current.showLoggedOut).toEqual(true)
    expect(result.current.profile).toBeNull()
  })

  it('should invoke logout', () => {
    const { result } = renderHook(useInNavigation)
    result.current.logout()
    expect(LOGOUT).toHaveBeenCalled()
  })

  it('should invoke login', () => {
    const { result } = renderHook(useInNavigation)
    result.current.login()
    expect(LOGIN).toHaveBeenCalled()
  })
})
