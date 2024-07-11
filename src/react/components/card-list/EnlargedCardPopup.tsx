import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  width: 95vw;
  aspect-ratio: 371/520;
  background-color: lightgray;
  border: 1px solid gray;

  @media screen and (min-width: 630px) {
    width: auto;
    height: 95vh;
  }
`

type EnlargedCardPopupProps = {
  imageUrl: string
}

const EnlargedCardPopup = ({ imageUrl }: EnlargedCardPopupProps) => {
  return (
    <Container>
      <Image src={imageUrl} />
    </Container>
  )
}

export default EnlargedCardPopup
