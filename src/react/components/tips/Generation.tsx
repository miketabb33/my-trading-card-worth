import React from 'react'
import styled from 'styled-components'
import { useGlobalPopup } from '../../providers/GlobalPopupProvider'
import EnlargedCardPopup from '../card-list/EnlargedCardPopup'

const Card = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  height: 20rem;
  max-height: 20rem;
  border: 1px solid rgb(190, 190, 190);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem;
`

const LeftStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1 1;
`

const RightStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 12rem;
`

const Image = styled.img`
  height: 90%;
`

const ExampleText = styled.p`
  text-align: center;
`

export type GenerationProps = {
  name: string
  subtitle: string
  indexMin: number
  indexMax: number
  yearMin: number
  yearMax: number
  setCount: number
  exampleImgSrc: string
}

const Generation = ({
  name,
  subtitle,
  indexMin,
  indexMax,
  yearMin,
  yearMax,
  setCount,
  exampleImgSrc,
}: GenerationProps) => {
  const { openEnlargedImage } = useInGeneration()
  return (
    <Card>
      <LeftStack>
        <h2>{name}</h2>
        <h4>{subtitle}</h4>
        <p>
          Pokemon Index: {indexMin}-{indexMax}
        </p>
        <p>Pokemon Count: {indexMax - indexMin + 1}</p>
        <p>
          Years Published: {yearMin}-{yearMax}
        </p>
        <p>Sets Released: {setCount}</p>
      </LeftStack>
      <RightStack>
        <ExampleText>Example Card</ExampleText>
        <Image
          src={exampleImgSrc}
          onClick={(e) => openEnlargedImage(e, <EnlargedCardPopup imageUrl={exampleImgSrc} />)}
        />
      </RightStack>
    </Card>
  )
}

const useInGeneration = () => {
  const { show: openEnlargedImage } = useGlobalPopup()

  return { openEnlargedImage }
}
export default Generation
