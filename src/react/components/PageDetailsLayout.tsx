import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`
const Header = styled.div`
  display: flex;
  gap: 1rem;
`

const Split = styled.div`
  display: flex;
  gap: 2rem;
`

type PageDetailsLayout = {
  header: ReactNode
  content: ReactNode
}

const PageDetailsLayout = ({ header, content }: PageDetailsLayout) => {
  return (
    <Container>
      <Header>{header}</Header>
      <Split>{content}</Split>
    </Container>
  )
}

export default PageDetailsLayout
