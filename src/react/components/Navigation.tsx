import React from 'react'
import { useProfile } from '../providers/ProfileProvider'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`
const Button = styled.button`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: none;
  }
`

const Navigation = () => {
  const { profile, showLoading, showLoggedIn, showLoggedOut, logout, login } =
    useInNavigation()

  return (
    <Container>
      {showLoading && <p>Loading...</p>}
      {showLoggedOut && <Button onClick={login}>Login</Button>}
      {showLoggedIn && profile && (
        <>
          <p>Hi, {profile.nickname}</p>
          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </Container>
  )
}

export const useInNavigation = () => {
  const { profile, isLoading, logout, login } = useProfile()

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
  }
}

export default Navigation
