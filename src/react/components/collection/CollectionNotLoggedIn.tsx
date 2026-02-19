import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useProfile } from '../../providers/ProfileProvider'
import { PATH_VALUES } from '../../router/pathValues'
import { Card } from '../base/Card'

const revealUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const goldFlow = keyframes`
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
`

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  max-width: 480px;
  padding: 4rem 3rem;
`

const CardIcon = styled.div`
  position: relative;
  width: 56px;
  height: 76px;
  border: 1.5px solid rgba(232, 160, 20, 0.35);
  border-radius: 6px;
  background: rgba(232, 160, 20, 0.04);
  animation: ${revealUp} 0.5s ease both;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border: 1.5px solid rgba(232, 160, 20, 0.4);
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
    background: rgba(232, 160, 20, 0.25);
  }
`

const Divider = styled.div`
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

const Heading = styled.h2`
  margin: 0;
  font-family: 'Cinzel', serif;
  font-size: clamp(2.4rem, 6vw, 3.2rem);
  font-weight: 700;
  line-height: 1.2;
  color: #f0ead8;
  animation: ${revealUp} 0.5s ease 0.1s both;
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

const Body = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.4rem;
  line-height: 1.75;
  color: #f0ead8;
  animation: ${revealUp} 0.5s ease 0.15s both;
`

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  animation: ${revealUp} 0.5s ease 0.2s both;
`

const PrimaryButton = styled.button`
  padding: 0.75rem 1.8rem;
  cursor: pointer;
  background: #e8a020;
  border: 1px solid #e8a020;
  border-radius: 6px;
  color: #0a0b14;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: #f5c433;
    border-color: #f5c433;
  }
`

const GhostButton = styled.button`
  padding: 0.75rem 1.8rem;
  cursor: pointer;
  background: transparent;
  border: 1px solid rgba(240, 234, 216, 0.2);
  border-radius: 6px;
  color: rgba(240, 234, 216, 0.6);
  font-family: 'DM Sans', sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(232, 160, 20, 0.4);
    color: #e8a020;
  }
`

const Hint = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.15rem;
  color: rgba(240, 234, 216, 0.6);
  animation: ${revealUp} 0.5s ease 0.25s both;

  a {
    color: rgba(232, 160, 20, 0.5);
    text-decoration: none;
    &:hover { color: #e8a020; }
  }
`

const CollectionNotLoggedIn = () => {
  const { login, signup } = useProfile()

  return (
    <Wrapper $variant="dark">
      <CardIcon />

      <Divider>
        <DividerLine />
        <Diamond />
        <DividerLine />
      </Divider>

      <Heading>
        Your <GoldWord>Collection</GoldWord> Awaits
      </Heading>

      <Body>
        Track card values, monitor the market,
        <br />
        and know exactly what your collection is worth.
      </Body>

      <Actions>
        <PrimaryButton onClick={signup}>Create a free account</PrimaryButton>
        <GhostButton onClick={login}>Log In</GhostButton>
      </Actions>

      <Hint>
        Browse cards without an account in the{' '}
        <a href={PATH_VALUES.catalog()}>Catalog</a>
      </Hint>
    </Wrapper>
  )
}

export default CollectionNotLoggedIn
