import React from 'react'
import { createContext, useContext } from 'react'
import { ChildrenProp } from '../types/ChildrenProp'
import { ExpansionDto } from '../../core/types/ExpansionDto'
import { useExpansionsData } from '../network/catalogClient'

export type ExpansionContextType = {
  expansions: ExpansionDto[] | null
  isLoading: boolean
}

const ProfileContext = createContext<ExpansionContextType>({
  expansions: [],
  isLoading: false,
})

export const useExpansionProvider = () => {
  const { data, isLoading } = useExpansionsData()

  return {
    expansions: data,
    isLoading,
  }
}

export const ExpansionContextProvider = ({ children }: ChildrenProp) => {
  const value = useExpansionProvider()

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useExpansion = (): ExpansionContextType => {
  return useContext(ProfileContext)
}
