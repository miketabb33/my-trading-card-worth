import React from 'react'
import styled from 'styled-components'
import InternalTextLink from '../base/text-link/InternalTextLink'
import { useProfile } from '../../providers/ProfileProvider'
import { PATH_VALUES } from '../../router/pathValues'

const List = styled.ol`
  list-style: decimal;
`

const ListItem = styled.li`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`

const CollectionNotLoggedIn = () => {
  const { login } = useProfile()
  return (
    <>
      <h1>Welcome To Your Collection!</h1>
      <h3>To get started:</h3>
      <List>
        <ListItem>
          <InternalTextLink label="Login" onClick={login} />
        </ListItem>
        <ListItem>
          Add cards to your collection with the <InternalTextLink label="Catalog" pathValue={PATH_VALUES.catalog()} />.
        </ListItem>
      </List>
    </>
  )
}

export default CollectionNotLoggedIn
