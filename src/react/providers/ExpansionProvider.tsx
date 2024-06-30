import React from 'react'
import { createContext, useContext } from 'react'
import { ChildrenProp } from '../types/ChildrenProp'
import { CardSetDto } from '../../core/types/CardSetDto'
import { useSetsData } from '../network/setsClient'

export type ExpansionContextType = {
  expansions: CardSetDto[] | null
  isLoading: boolean
}

const ProfileContext = createContext<ExpansionContextType>({
  expansions: [],
  isLoading: false,
})

export const useExpansionProvider = () => {
  const { data, isLoading } = useSetsData()

  return {
    expansions: data,
    isLoading,
  }
}

export const ExpansionContextProvider = ({ children }: ChildrenProp) => {
  const value = useExpansionProvider()

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export const useExpansion = (): ExpansionContextType => {
  return useContext(ProfileContext)
}
