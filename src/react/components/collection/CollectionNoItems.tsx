import React from 'react'
import TextLink from '../base/TextLink'
import { PATH_VALUES } from '../../router/pathValues'

const CollectionNoItems = () => {
  return (
    <>
      <h1>There Are No Items In Your Collection!</h1>
      <h3>
        Add cards to your collection with the{' '}
        <TextLink label="Catalog" pathValue={PATH_VALUES.catalog()} />.
      </h3>
    </>
  )
}

export default CollectionNoItems
