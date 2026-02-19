import React from 'react'
import styled from 'styled-components'
import { useProfile } from '../../providers/ProfileProvider'

const UserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`

const NavButton = styled.button<{ $primary?: boolean }>`
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  background-color: ${({ $primary }) => ($primary ? '#e8a020' : 'transparent')};
  border: 1px solid ${({ $primary, theme }) => ($primary ? '#e8a020' : theme.staticColor.gray_600)};
  border-radius: 0.4rem;
  color: ${({ $primary, theme }) => ($primary ? '#0a0b14' : theme.staticColor.gray_200)};
  font-size: 1.3rem;
  font-weight: ${({ $primary }) => ($primary ? '600' : '500')};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ $primary }) => ($primary ? '#f5c433' : undefined)};
    background-color: ${({ $primary }) => ($primary ? '#f5c433' : 'transparent')};
    color: ${({ $primary, theme }) => ($primary ? '#0a0b14' : theme.staticColor.gold_400)};
  }
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
          <NavButton onClick={login} id="LoginButton">
            Log In
          </NavButton>
          <NavButton onClick={signup} $primary id="SignUpButton">
            Sign Up
          </NavButton>
        </>
      )}
      {showLoggedIn && profile && (
        <>
          <Nickname id="NavNameTag">Hi, {profile.nickname}</Nickname>
          <NavButton onClick={logout}>Logout</NavButton>
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
