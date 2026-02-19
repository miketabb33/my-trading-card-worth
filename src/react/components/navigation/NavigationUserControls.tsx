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

const Nickname = styled.p`
  color: ${({ theme }) => theme.staticColor.gray_300};
  font-size: 1.3rem;
`

const LoadingText = styled.p`
  color: ${({ theme }) => theme.staticColor.gray_500};
  font-size: 1.3rem;
`

const NavigationUserControls = () => {
  const { profile, showLoading, showLoggedIn, showLoggedOut, logout, login, signup } = useInNavigationUserControls()
  return (
    <UserControls>
      {showLoading && <LoadingText>Loading...</LoadingText>}
      {showLoggedOut && (
        <>
          <Button $variant="ghost" onClick={login} id="LoginButton">Log In</Button>
          <Button $variant="primary" onClick={signup} id="SignUpButton">Sign Up</Button>
        </>
      )}
      {showLoggedIn && profile && (
        <>
          <Nickname id="NavNameTag">Hi, {profile.nickname}</Nickname>
          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </UserControls>
  )
}

export const useInNavigationUserControls = () => {
  const { profile, isLoading, logout, login, signup } = useProfile()

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
    signup,
  }
}

export default NavigationUserControls
