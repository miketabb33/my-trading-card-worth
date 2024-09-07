import React from 'react'
import styled from 'styled-components'
import { releases } from './releases'
import Topics from './Topics'

const Heading = styled.h1`
  margin-bottom: 1rem;
`

const ReleaseNotes = () => {
  return (
    <div>
      <Heading>Release Notes</Heading>
      {releases.map((release) => (
        <div key={release.version}>
          <h2>Version: {release.version}</h2>
          <Topics topics={release.topics} />
        </div>
      ))}
    </div>
  )
}

export default ReleaseNotes
