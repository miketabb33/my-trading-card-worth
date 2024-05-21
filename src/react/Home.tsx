import React from 'react'
import styled from 'styled-components'
import { useSets } from './network/setsClient'

const Container = styled.div`
  background-color: red;
`

const Home = () => {
  const { data: sets } = useSets()

  return (
    <Container>
      {sets?.map((set) => {
        return <h3 key={set.id}>{set.name}</h3>
      })}
    </Container>
  )
}

export default Home
