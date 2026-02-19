import React from 'react'
import styled, { keyframes } from 'styled-components'
import Autocomplete from '../base/form/Autocomplete'
import useHomeSearch from './useHomeSearch'
import HeroStats from './HeroStats'

const revealUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

const goldFlow = keyframes`
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  max-width: 580px;
  width: 100%;
  text-align: center;
`

const Badge = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #e8a020;
  background: rgba(232, 160, 20, 0.1);
  border: 1px solid rgba(232, 160, 20, 0.25);
  padding: 0.3rem 0.9rem;
  border-radius: 100px;
  animation: ${revealUp} 0.5s ease both;
`

const Heading = styled.h1`
  margin: 0;
  font-family: 'Cinzel', serif;
  font-size: clamp(2.2rem, 6vw, 4.2rem);
  font-weight: 900;
  line-height: 1.08;
  color: #f0ead8;
  animation: ${revealUp} 0.5s ease 0.08s both;
`

const GoldWord = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #b87010, #f5c433 30%, #ffd060 50%, #e8a020 70%, #c88020);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${goldFlow} 4s linear infinite;
`

const Sub = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(240, 234, 216, 0.42);
  animation: ${revealUp} 0.5s ease 0.16s both;
`

const SearchPanel = styled.div`
  width: 100%;
  border: 1px solid rgba(232, 160, 20, 0.2);
  border-bottom: none;
  border-radius: 14px;
  background: rgba(10, 11, 20, 0.85);
  padding: 1.4rem 1.5rem 1.5rem;
  backdrop-filter: blur(12px);
  box-shadow:
    0 0 48px rgba(232, 160, 20, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  animation: ${revealUp} 0.5s ease 0.24s both;
  position: relative;
  z-index: 2;
`

const SearchPrompt = styled.p`
  margin: 0 0 0.7rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(240, 234, 216, 0.28);
  text-align: left;
`

const HeroContent = () => {
  const { autocompleteBind } = useHomeSearch()

  return (
    <Content>
      <Badge>Pokémon TCG Market Intelligence</Badge>

      <Heading>
        Know the <GoldWord>Valor</GoldWord>
        <br />
        of Your Collection
      </Heading>
      <Sub>
        Real-time market prices across every Pokémon expansion.
        <br />
        Track, compare, and grow your collection.
      </Sub>

      <SearchPanel>
        <SearchPrompt>Search by Expansion</SearchPrompt>
        <Autocomplete {...autocompleteBind} />
      </SearchPanel>

      <HeroStats />
    </Content>
  )
}

export default HeroContent
