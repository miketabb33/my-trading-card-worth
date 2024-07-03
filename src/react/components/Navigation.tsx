import React from 'react'
import { useProfile } from '../providers/ProfileProvider'
import styled, { css } from 'styled-components'
import { Button } from './base/Button'
import RouterLink from '../router/RouterLink'
import { PATH_VALUES } from '../router/pathValues'
import { useRouter } from '../router/useRouter'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  height: 6rem;
`

const BlankGridItem = styled.div``

const UserControls = styled.div`
  display: flex;
  justify-self: end;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`

const OptionList = styled.ul`
  display: flex;
  justify-self: center;
  align-items: center;
  height: 100%;
`

const OptionItem = styled.li`
  height: 100%;
`

const OptionContent = styled.p``

const SelectedOption = css`
  background-color: ${({ theme }) => theme.staticColor.gray_100};
  transform: translateY(-0.15rem);
  font-size: larger;
`

const Link = styled(RouterLink)<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  cursor: pointer;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  transition: all 0.2s;

  ${({ $selected }) => $selected && SelectedOption}

  &:hover {
    ${SelectedOption}
  }
`

const Navigation = () => {
  const {
    profile,
    showLoading,
    showLoggedIn,
    showLoggedOut,
    logout,
    login,
    catalogIsSelected,
    collectionIsSelected,
  } = useInNavigation()

  return (
    <Container>
      <BlankGridItem />

      <OptionList>
        <OptionItem>
          <Link linkTo={PATH_VALUES.catalog()} $selected={catalogIsSelected}>
            <OptionContent>Catalog</OptionContent>
          </Link>
        </OptionItem>
        <OptionItem>
          <Link
            linkTo={PATH_VALUES.collection}
            $selected={collectionIsSelected}
          >
            <OptionContent>Collection</OptionContent>
          </Link>
        </OptionItem>
      </OptionList>

      <UserControls>
        {showLoading && <p>Loading...</p>}
        {showLoggedOut && <Button onClick={login}>Login</Button>}
        {showLoggedIn && profile && (
          <>
            <p>Hi, {profile.nickname}</p>
            <Button onClick={logout}>Logout</Button>
          </>
        )}
      </UserControls>
    </Container>
  )
}

export const useInNavigation = () => {
  const { profile, isLoading, logout, login } = useProfile()

  const { pathname } = useRouter()

  const showLoading = isLoading
  const showLoggedOut = !isLoading && !profile
  const showLoggedIn = !isLoading && !!profile

  return {
    profile,
    showLoading,
    showLoggedOut,
    showLoggedIn,
    logout,
    login,
    collectionIsSelected: pathname === '/collection',
    catalogIsSelected: pathname.includes('/catalog'),
  }
}

export default Navigation
