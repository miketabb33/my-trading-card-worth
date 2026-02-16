import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 3rem;
  right: 1rem;
  pointer-events: auto;

  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
`

const Logo = styled.img`
  height: 3rem;
  object-fit: contain;
`

type ExpansionLogoProps = {
  logoUrl: string | null
}

const ExpansionLogo = ({ logoUrl }: ExpansionLogoProps) => {
  if (!logoUrl) return null
  return (
    <Container>
      <Logo src={logoUrl} />
    </Container>
  )
}

export default ExpansionLogo
