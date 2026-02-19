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
import { Button } from '../base/Button'

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  animation: ${revealUp} 0.5s ease 0.2s both;
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
        <Button $variant="primary" onClick={signup}>
          Create a free account
        </Button>
        <Button $variant="ghost" onClick={login}>
          Log In
        </Button>
      </Actions>

      <Hint>
        Browse cards without an account in the <a href={PATH_VALUES.catalog()}>Catalog</a>
      </Hint>
    </EmptyStateWrapper>
  )
}

export default CollectionNotLoggedIn
