import { renderHook } from '@testing-library/react'
import * as ProfileProviderModule from '../../../../src/react/providers/ProfileProvider'
import { PROFILE_CONTEXT_TYPE } from '../../__MOCKS__/profileContextType.mock'
import { useInNavigationUserControls } from '../../../../src/react/components/navigation/NavigationUserControls'
import { PROFILE_DTO } from '../../../core/__MOCKS__/profileDto.mock'

const USE_PROFILE = jest.spyOn(ProfileProviderModule, 'useProfile')

const LOGOUT = jest.fn()
const LOGIN = jest.fn()

const PROFILE_RETURN = {
  ...PROFILE_CONTEXT_TYPE,
  logout: LOGOUT,
  login: LOGIN,
}

beforeEach(jest.clearAllMocks)

describe('Use In Navigation User Controls', () => {
  it('should return loading true', () => {
    USE_PROFILE.mockReturnValue({ ...PROFILE_RETURN, isLoading: true })

    const { result } = renderHook(useInNavigationUserControls)
    expect(result.current.showLoading).toEqual(true)
    expect(result.current.showLoggedIn).toEqual(false)
    expect(result.current.showLoggedOut).toEqual(false)
    expect(result.current.profile).toBeNull()
  })

  it('should show logged in when not loading and profile exists', () => {
    USE_PROFILE.mockReturnValue({
      ...PROFILE_RETURN,
      isLoading: false,
      profile: PROFILE_DTO,
    })

    const { result } = renderHook(useInNavigationUserControls)
    expect(result.current.showLoading).toEqual(false)
    expect(result.current.showLoggedIn).toEqual(true)
    expect(result.current.showLoggedOut).toEqual(false)
    expect(result.current.profile).toEqual(PROFILE_DTO)
  })

  it('should show logged out when not loading and profile is null', () => {
    USE_PROFILE.mockReturnValue({
      ...PROFILE_RETURN,
      isLoading: false,
      profile: null,
    })

    const { result } = renderHook(useInNavigationUserControls)
    expect(result.current.showLoading).toEqual(false)
    expect(result.current.showLoggedIn).toEqual(false)
    expect(result.current.showLoggedOut).toEqual(true)
    expect(result.current.profile).toBeNull()
  })

  it('should invoke logout', () => {
    const { result } = renderHook(useInNavigationUserControls)
    result.current.logout()
    expect(LOGOUT).toHaveBeenCalled()
  })

  it('should invoke login', () => {
    const { result } = renderHook(useInNavigationUserControls)
    result.current.login()
    expect(LOGIN).toHaveBeenCalled()
  })
})
