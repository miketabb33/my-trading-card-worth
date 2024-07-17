import React from 'react'
import { createContext, useContext } from 'react'
import { ChildrenProp } from '../types/ChildrenProp'
import { StoreStatusDto } from '../../core/types/StoreStatusDto'
import { useStoreStatusData } from '../network/storeClient'

export type StoreStatusContextType = {
  storeStatus: StoreStatusDto | null
  isLoading: boolean
}

const StoreStatusContext = createContext<StoreStatusContextType>({
  storeStatus: null,
  isLoading: false,
})

export const useStoreStatusProvider = () => {
  const { data, isLoading } = useStoreStatusData()

  return {
    storeStatus: data,
    isLoading,
  }
}

export const StoreStatusContextProvider = ({ children }: ChildrenProp) => {
  const value = useStoreStatusProvider()

  return (
    <StoreStatusContext.Provider value={value}>
      {children}
    </StoreStatusContext.Provider>
  )
}

export const useStoreStatus = (): StoreStatusContextType => {
  return useContext(StoreStatusContext)
}
