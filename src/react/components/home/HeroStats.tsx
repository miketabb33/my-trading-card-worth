import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useExpansion } from '../../providers/ExpansionProvider'

const revealUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: ${revealUp} 0.5s ease 0.32s both;
`

const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
`

const StatNum = styled.span`
  font-family: 'Cinzel', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #e8a020;
  line-height: 1;
`

const StatText = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(240, 234, 216, 0.28);
`

const StatSep = styled.div`
  width: 1px;
  height: 1.8rem;
  background: rgba(232, 160, 20, 0.18);
`

const HeroStats = () => {
  const { expansions } = useExpansion()
  if (!expansions) return null

  return (
    <StatsRow>
      <StatBlock>
        <StatNum>{expansions.length}+</StatNum>
        <StatText>Expansions</StatText>
      </StatBlock>
      <StatSep />
      <StatBlock>
        <StatNum>Live</StatNum>
        <StatText>Market Data</StatText>
      </StatBlock>
      <StatSep />
      <StatBlock>
        <StatNum>Free</StatNum>
        <StatText>To Start</StatText>
      </StatBlock>
    </StatsRow>
  )
}

export default HeroStats
