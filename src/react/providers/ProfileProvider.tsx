import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import { ChildrenProp } from '../types/ChildrenProp'
import { ProfileDto } from '../../core/types/ProfileDto'
import { useProfileData } from '../network/profileClient'
import { UseEffectType } from '../types/UseEffectType'
import { setAuthReturnUrl } from '../router/authReturnUrl'

export type ProfileContextType = {
  profile: ProfileDto | null
  isLoading: boolean
  isLoggedIn: boolean
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
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
})

export const useProfileProvider = () => {
  const { data: profile, isLoading } = useProfileData()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loggedInEffect: UseEffectType = {
    effect: () => setIsLoggedIn(!!profile),
    deps: [profile],
  }

  const logout = () => {
    setAuthReturnUrl(location.pathname)
    location.pathname = '/logout'
  }
  const login = () => {
    setAuthReturnUrl(location.pathname)
    location.pathname = '/login'
  }

  return {
    value: { profile, isLoading, isLoggedIn, logout, login },
    loggedInEffect,
  }
}

export const ProfileContextProvider = ({ children }: ChildrenProp) => {
  const { value, loggedInEffect } = useProfileProvider()
  useEffect(loggedInEffect.effect, loggedInEffect.deps)
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useProfile = (): ProfileContextType => {
  return useContext(ProfileContext)
}
