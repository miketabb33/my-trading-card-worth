import React from 'react'
import styled from 'styled-components'
import { useProfile } from '../../providers/ProfileProvider'
import { PATH_VALUES } from '../../router/pathValues'
import { revealUp } from '../base/animations'
import {
  EmptyStateWrapper,
  EmptyStateCardIcon,
  EmptyStateDivider,
  EmptyStateHeading,
  EmptyStateBody,
} from '../base/EmptyState'
import { GoldWord } from '../base/GoldWord'

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
  transition:
    background 0.2s,
    border-color 0.2s;

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
  transition:
    border-color 0.2s,
    color 0.2s;

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
    &:hover {
      color: #e8a020;
    }
  }
`

const CollectionNotLoggedIn = () => {
  const { login, signup } = useProfile()

  return (
    <EmptyStateWrapper $variant="dark" style={{ maxWidth: '480px' }}>
      <EmptyStateCardIcon />
      <EmptyStateDivider />

      <EmptyStateHeading>
        Your <GoldWord>Collection</GoldWord> Awaits
      </EmptyStateHeading>

      <EmptyStateBody>
        Track card values, monitor the market,
        <br />
        and know exactly what your collection is worth.
      </EmptyStateBody>

      <Actions>
        <PrimaryButton onClick={signup}>Create a free account</PrimaryButton>
        <GhostButton onClick={login}>Log In</GhostButton>
      </Actions>

      <Hint>
        Browse cards without an account in the <a href={PATH_VALUES.catalog()}>Catalog</a>
      </Hint>
    </EmptyStateWrapper>
  )
}

export default CollectionNotLoggedIn
