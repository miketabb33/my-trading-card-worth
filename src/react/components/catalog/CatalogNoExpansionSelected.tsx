import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Card } from '../base/Card'

const revealUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.6rem;
  max-width: 420px;
  padding: 4rem 3rem;
`

const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  animation: ${revealUp} 0.4s ease both;
`

const CardSlot = styled.div<{ $offset?: number }>`
  width: 42px;
  height: 58px;
  border: 1.5px solid rgba(232, 160, 20, 0.7);
  border-radius: 5px;
  background: rgba(232, 160, 20, 0.12);
  transform: rotate(${({ $offset }) => ($offset ?? 0)}deg);
  box-shadow: 0 0 12px rgba(232, 160, 20, 0.12);
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  animation: ${revealUp} 0.4s ease 0.05s both;
`

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(232, 160, 20, 0.6));

  &:last-child {
    background: linear-gradient(90deg, rgba(232, 160, 20, 0.6), transparent);
  }
`

const Diamond = styled.div`
  width: 5px;
  height: 5px;
  background: #e8a020;
  transform: rotate(45deg);
`

const Heading = styled.h2`
  margin: 0;
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 700;
  color: #f0ead8;
  animation: ${revealUp} 0.4s ease 0.1s both;
`

const Body = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.4rem;
  line-height: 1.7;
  color: #f0ead8;
  animation: ${revealUp} 0.4s ease 0.15s both;
`

const CatalogNoExpansionSelected = () => {
  return (
    <Wrapper $variant="dark" id="NoExpansionSelected">
      <IconRow>
        <CardSlot $offset={-6} />
        <CardSlot />
        <CardSlot $offset={6} />
      </IconRow>

      <Divider>
        <DividerLine />
        <Diamond />
        <DividerLine />
      </Divider>

      <Heading>Choose Your Expansion</Heading>

      <Body>
        Search above to explore cards and real-time
        <br />
        market prices from any TCG expansion.
      </Body>
    </Wrapper>
  )
}

export default CatalogNoExpansionSelected
