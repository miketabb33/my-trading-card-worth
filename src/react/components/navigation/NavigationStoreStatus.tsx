import React from 'react'
import styled from 'styled-components'
import { useStoreStatus } from '../../providers/StoreStatusProvider'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = styled.p`
  font-size: 1.25rem;
`

const NavigationStoreStatus = () => {
  const { expansionStatus, pricesStatus } = useInNavigationStoreStatus()
  return (
    <Container>
      <Item>
        <strong>Prices:</strong> {pricesStatus}
      </Item>
      <Item>
        <strong>Expansions:</strong> {expansionStatus}
      </Item>
    </Container>
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
      expansionStatus: '',
      pricesStatus: '',
    }
  } else {
    return {
      expansionStatus: buildStatusMessage(storeStatus.expansionsLastUpdatedDateString),
      pricesStatus: buildStatusMessage(storeStatus.pricesLastUpdatedDateString),
    }
  }
}

export default NavigationStoreStatus
