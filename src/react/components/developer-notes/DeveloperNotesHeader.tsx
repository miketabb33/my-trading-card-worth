import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 3rem 0;
`

const Title = styled.h2`
  margin-bottom: 1rem;
`

const DeveloperNotesHeader = () => {
  return (
    <Container>
      <Title>Thank you for using My Trading Card Worth!</Title>
      <h4>
        Contact me at <a href="mailto:miketabb33@gmail.com">miketabb33@gmail.com</a>. I&apos;d love to hear about your
        experience and idea&apos;s.
      </h4>
    </Container>
  )
}

export default DeveloperNotesHeader
