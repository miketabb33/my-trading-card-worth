import React from 'react'
import styled from 'styled-components'
import { PATH_VALUES } from '../../router/pathValues'
import {
  EmptyStateWrapper,
  EmptyStateCardIcon,
  EmptyStateDivider,
  EmptyStateHeading,
  EmptyStateBody,
} from '../base/EmptyState'
import { GoldWord } from '../base/GoldWord'

const CatalogLink = styled.a`
  color: #e8a020;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.75;
  }
`

const CollectionNoItems = () => {
  return (
    <EmptyStateWrapper $variant="dark" style={{ maxWidth: '480px' }}>
      <EmptyStateCardIcon />
      <EmptyStateDivider />

      <EmptyStateHeading>
        Your <GoldWord>Collection</GoldWord> is Empty
      </EmptyStateHeading>

      <EmptyStateBody>
        Head to the{' '}
        <CatalogLink id="CollectionCatalogLink" href={PATH_VALUES.catalog()}>
          Catalog
        </CatalogLink>{' '}
        to browse expansions and add cards to your collection.
      </EmptyStateBody>
    </EmptyStateWrapper>
  )
}

export default CollectionNoItems
