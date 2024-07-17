import React from 'react'
import styled from 'styled-components'
import { useStoreStatus } from '../../providers/StoreStatusProvider'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = styled.p`
  font-size: 1.3rem;
`

const NavigationStoreStatus = () => {
  const { expansionStatus, pricesStatus } = useInNavigationStoreStatus()
  return (
    <Container>
      <Item>Prices: {pricesStatus}</Item>
      <Item>Expansions: {expansionStatus}</Item>
    </Container>
  )
}

export const useInNavigationStoreStatus = () => {
  const { storeStatus } = useStoreStatus()

  if (!storeStatus) {
    return {
      expansionStatus: '',
      pricesStatus: '',
    }
  } else {
    return {
      expansionStatus: storeStatus.expansionsStatus,
      pricesStatus: storeStatus.pricesStatus,
    }
  }
}

export default NavigationStoreStatus
