import React from 'react'
import styled from 'styled-components'
import { revealUp } from '../base/animations'
import { EmptyStateWrapper, EmptyStateDivider, EmptyStateHeading, EmptyStateBody } from '../base/EmptyState'

const IconWrapper = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  animation: ${revealUp} 0.4s ease both;
`

const Ring = styled.div`
  position: absolute;
  inset: 0;
  border: 1.5px solid rgba(232, 160, 20, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(232, 160, 20, 0.12);
`

const InnerRing = styled.div`
  position: absolute;
  inset: 10px;
  border: 1.5px solid rgba(232, 160, 20, 0.5);
  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: rgba(232, 160, 20, 0.8);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(232, 160, 20, 0.5);
  }
`

const CatalogNoCards = () => {
  return (
    <EmptyStateWrapper $variant="dark" style={{ maxWidth: '380px', gap: '1.6rem' }}>
      <IconWrapper>
        <Ring />
        <InnerRing />
      </IconWrapper>

      <EmptyStateDivider />

      <EmptyStateHeading>Coming Soon</EmptyStateHeading>

      <EmptyStateBody>
        This expansion is still being catalogued.
        <br />
        Check back soon.
      </EmptyStateBody>
    </EmptyStateWrapper>
  )
}

export default CatalogNoCards
