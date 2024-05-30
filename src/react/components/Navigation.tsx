import React from 'react'
import { useProfile } from '../providers/ProfileProvider'
import styled from 'styled-components'
import { Button } from './base/Button'

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
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
