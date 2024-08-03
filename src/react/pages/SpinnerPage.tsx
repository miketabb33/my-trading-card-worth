import styled from 'styled-components'
import Spinner from '../components/base/Spinner'
import React from 'react'

const Container = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SpinnerPage = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  )
}

export default SpinnerPage
