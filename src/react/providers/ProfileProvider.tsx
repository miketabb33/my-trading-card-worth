import React from 'react'
import { createContext, useContext } from 'react'
import { ChildrenProp } from '../types/ChildrenProp'
import { ProfileDto } from '../../core/types/ProfileDto'
import { useProfileData } from '../network/profileClient'

export type ProfileContextType = {
  profile: ProfileDto | null
  isLoading: boolean
  logout: () => void
  login: () => void
}

const ProfileContext = createContext<ProfileContextType>({
  profile: {
    userId: '',
    email: null,
    name: '',
    nickname: '',
    picture: null,
  },
  isLoading: false,
  logout: () => {},
  login: () => {},
})

export const useProfileProvider = () => {
  const { data: profile, isLoading } = useProfileData()

  const logout = () => (location.pathname = '/logout')
  const login = () => (location.pathname = '/login')

  return { profile, isLoading, logout, login }
}

export const ProfileContextProvider = ({ children }: ChildrenProp) => {
  const value = useProfileProvider()
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export const useProfile = (): ProfileContextType => {
  return useContext(ProfileContext)
}
