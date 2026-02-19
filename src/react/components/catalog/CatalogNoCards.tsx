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
  max-width: 380px;
  padding: 4rem 3rem;
`

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
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
  color: #f0ead8;
  animation: ${revealUp} 0.4s ease 0.1s both;
`

const Body = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.35rem;
  line-height: 1.7;
  color: #f0ead8;
  animation: ${revealUp} 0.4s ease 0.15s both;
`

const CatalogNoCards = () => {
  return (
    <Wrapper $variant="dark">
      <IconWrapper>
        <Ring />
        <InnerRing />
      </IconWrapper>

      <Divider>
        <DividerLine />
        <Diamond />
        <DividerLine />
      </Divider>

      <Heading>Coming Soon</Heading>

      <Body>
        This expansion is still being catalogued.
        <br />
        Check back soon.
      </Body>
    </Wrapper>
  )
}

export default CatalogNoCards
