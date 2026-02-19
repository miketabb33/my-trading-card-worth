import React from 'react'
import styled from 'styled-components'
import PageLayout from '../components/base/layout/PageLayout'
import GenerationList from '../components/tips/GenerationList'

const Explainer = styled.div`
  max-width: 90rem;
  margin: 4rem auto 0;
  padding: 0 2rem;
`

const Title = styled.h1`
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 700;
  color: ${({ theme }) => theme.staticColor.gray_900};
  margin: 0 0 0.8rem;
`

const Sub = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.staticColor.gray_600};
  margin: 0;
`

const SeriesPage = () => {
  return (
    <PageLayout>
      <Explainer>
        <Title>Identify Your Card&apos;s Series</Title>
        <Sub>
          Found a card and not sure where it&apos;s from? Browse the card styles below to match your card to its series.
        </Sub>
      </Explainer>
      <GenerationList />
    </PageLayout>
  )
}

export default SeriesPage
