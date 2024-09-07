import React from 'react'
import styled from 'styled-components'

const TopicSection = styled.div`
  margin-top: 1.5rem;
`

const BulletPointContainer = styled.ul`
  margin-top: 1rem;
  margin-left: 3rem;
`

const TopicItem = styled.li`
  list-style: disc;
`

export type Topic = {
  title: string
  bulletPoints: string[]
}

export type TopicProps = {
  topics: Topic[]
}

const Topics = ({ topics }: TopicProps) => {
  return (
    <>
      {topics.map((topic, i) => (
        <TopicSection key={i}>
          <h3>{topic.title}</h3>
          <BulletPointContainer>
            {topic.bulletPoints.map((bulletPoint, i) => (
              <TopicItem key={i}>{bulletPoint}</TopicItem>
            ))}
          </BulletPointContainer>
        </TopicSection>
      ))}
    </>
  )
}

export default Topics
