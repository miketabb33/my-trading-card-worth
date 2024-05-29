import React from 'react'
import { useProfile } from '../providers/ProfileProvider'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  padding: 1rem;
`

const Navigation = () => {
  const { profile, isLoading, logout, login } = useProfile()

  const showLoading = isLoading
  const showLoggedOut = !isLoading && !profile
  const showLoggedIn = !isLoading && profile

  return (
    <Container>
      {showLoading && <p>Loading...</p>}
      {showLoggedOut && <button onClick={login}>Login</button>}
      {showLoggedIn && (
        <>
          <p>Hi, {profile.nickname}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </Container>
  )
}

export default Navigation
