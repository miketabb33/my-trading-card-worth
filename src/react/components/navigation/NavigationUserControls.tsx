import React from 'react'
import styled from 'styled-components'
import { useProfile } from '../../providers/ProfileProvider'
import { Button } from '../base/Button'

const UserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`

const NavigationUserControls = () => {
  const { profile, showLoading, showLoggedIn, showLoggedOut, logout, login } = useInNavigationUserControls()
  return (
    <UserControls>
      {showLoading && <p>Loading...</p>}
      {showLoggedOut && (
        <Button onClick={login} id="LoginButton">
          Login
        </Button>
      )}
      {showLoggedIn && profile && (
        <>
          <p id="NavNameTag">Hi, {profile.nickname}</p>
          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </UserControls>
  )
}

export const useInNavigationUserControls = () => {
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

export default NavigationUserControls
