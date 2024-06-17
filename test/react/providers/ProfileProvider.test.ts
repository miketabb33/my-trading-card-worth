/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { useProfileProvider } from '../../../src/react/providers/ProfileProvider'
import * as ProfileClientModule from '../../../src/react/network/profileClient'
import { PROFILE_DTO } from '../../core/__MOCKS__/profileDto.mock'

const USE_PROFILE_DATA = jest.spyOn(ProfileClientModule, 'useProfileData')

const RESPONSE = {
  data: null,
  isLoading: false,
  refresh: () => {},
}

USE_PROFILE_DATA.mockReturnValue(RESPONSE)

// @ts-ignore
delete global.window.location
global.window = Object.create(window)
// @ts-ignore
global.window.location = {}

describe('Use Profile Provider', () => {
  it('should log user in when profile data exists', async () => {
    USE_PROFILE_DATA.mockReturnValue({ ...RESPONSE, data: PROFILE_DTO })
    const { result } = renderHook(useProfileProvider)
    expect(result.current.value.isLoggedIn).toEqual(false)

    await act(async () => await result.current.loggedInEffect.effect())

    expect(result.current.value.isLoggedIn).toEqual(true)
    expect(result.current.loggedInEffect.deps).toEqual([PROFILE_DTO])
    expect(result.current.value.profile).toEqual(PROFILE_DTO)
  })

  it('should NOT log user in when no profile data', async () => {
    USE_PROFILE_DATA.mockReturnValue({ ...RESPONSE, data: null })
    const { result } = renderHook(useProfileProvider)
    expect(result.current.value.isLoggedIn).toEqual(false)

    await act(async () => await result.current.loggedInEffect.effect())

    expect(result.current.value.isLoggedIn).toEqual(false)
    expect(result.current.value.profile).toBeNull()
  })

  it('should visit logout url when logout is invoked', () => {
    const { result } = renderHook(useProfileProvider)
    result.current.value.logout()
    expect(location.pathname).toEqual('/logout')
  })
  it('should visit login url when login is invoked', () => {
    const { result } = renderHook(useProfileProvider)
    result.current.value.login()
    expect(location.pathname).toEqual('/login')
  })
})
