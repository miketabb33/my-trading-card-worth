import React from 'react'
import styled from 'styled-components'
import { useStoreStatus } from '../../network/storeClient'

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

const useInNavigationStoreStatus = () => {
  const { data: storeStatusDto } = useStoreStatus()

  if (!storeStatusDto) {
    return {
      expansionStatus: '',
      pricesStatus: '',
    }
  } else {
    return {
      expansionStatus: storeStatusDto.expansionsStatus,
      pricesStatus: storeStatusDto.pricesStatus,
    }
  }
}

export default NavigationStoreStatus
