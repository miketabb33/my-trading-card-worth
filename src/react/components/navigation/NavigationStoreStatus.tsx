import React from 'react'
import styled from 'styled-components'
import { useStoreStatus } from '../../providers/StoreStatusProvider'

const Item = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.staticColor.gray_500};
`

const Label = styled.strong`
  color: ${({ theme }) => theme.staticColor.gray_400};
`

const NavigationStoreStatus = () => {
  const { pricesStatus } = useInNavigationStoreStatus()
  return (
    <Item>
      <Label>Prices:</Label> {pricesStatus}
    </Item>
  )
}

export const useInNavigationStoreStatus = () => {
  const { storeStatus } = useStoreStatus()

  const buildStatusMessage = (lastUpdated: string | null) => {
    if (!lastUpdated) return 'Loading... Try again later'
    const lastUpdatedDate = new Date(lastUpdated)
    const formattedDate = lastUpdatedDate.toLocaleString()
    return `Last Updated ${formattedDate}`
  }

  if (!storeStatus) {
    return {
      pricesStatus: '',
    }
  } else {
    return {
      pricesStatus: buildStatusMessage(storeStatus.pricesLastUpdatedDateString),
    }
  }
}

export default NavigationStoreStatus
