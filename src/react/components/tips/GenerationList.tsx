import React from 'react'
import Generation from './Generation'
import { generationListData } from './generationListData'
import styled, { css } from 'styled-components'
import { tabLandAndUp } from '../../styles/Responsive'

const Container = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 90rem;
  margin: auto;
  margin-top: 5rem;
  margin-bottom: 10rem;

  ${tabLandAndUp(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`

const GenerationList = () => {
  return (
    <Container>
      {generationListData.map((generation) => (
        <Generation key={generation.name} {...generation} />
      ))}
    </Container>
  )
}
export default GenerationList
