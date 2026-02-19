import React from 'react'
import styled from 'styled-components'
import { Card } from './Card'
import { revealUp } from './animations'

export const EmptyStateWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  padding: 4rem 3rem;
`

export const EmptyStateCardIcon = styled.div`
  position: relative;
  width: 56px;
  height: 76px;
  border: 1.5px solid rgba(232, 160, 20, 0.7);
  border-radius: 6px;
  background: rgba(232, 160, 20, 0.12);
  box-shadow: 0 0 12px rgba(232, 160, 20, 0.12);
  animation: ${revealUp} 0.5s ease both;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border: 1.5px solid rgba(232, 160, 20, 0.6);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 28px;
    height: 1px;
    background: rgba(232, 160, 20, 0.5);
  }
`

const DividerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  animation: ${revealUp} 0.5s ease 0.05s both;
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

export const EmptyStateDivider = () => (
  <DividerRow>
    <DividerLine />
    <Diamond />
    <DividerLine />
  </DividerRow>
)

export const EmptyStateHeading = styled.h2`
  margin: 0;
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  color: #f0ead8;
  animation: ${revealUp} 0.5s ease 0.1s both;
`

export const EmptyStateBody = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.4rem;
  line-height: 1.75;
  color: #f0ead8;
  animation: ${revealUp} 0.5s ease 0.15s both;
`
