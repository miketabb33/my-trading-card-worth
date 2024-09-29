import React from 'react'
import ReleaseNotes from './ReleaseNotes'
import styled, { css } from 'styled-components'
import FeatureConsiderations from './FeatureConsiderations'
import { tabLandAndUp } from '../../styles/Responsive'
import DeveloperNotesHeader from './DeveloperNotesHeader'

const Container = styled.div`
  margin-bottom: 8rem;
`

const LeftRight = styled.div`
  margin-top: 2rem;
  display: grid;
  column-gap: 3rem;
  row-gap: 3rem;

  ${tabLandAndUp(css`
    grid-template-columns: 1fr 1fr;
  `)}
`

const DeveloperNotes = () => {
  return (
    <Container>
      <DeveloperNotesHeader />
      <LeftRight>
        <FeatureConsiderations />
        <ReleaseNotes />
      </LeftRight>
    </Container>
  )
}

export default DeveloperNotes
