import Markdown from 'markdown-to-jsx'
import React from 'react'
import styled from 'styled-components'

const Title = styled.h3`
  margin-top: 1.5rem;
`

const BulletPointContainer = styled.ul`
  margin-top: 1rem;
  margin-left: 3rem;
`

const TopicItem = styled.li`
  list-style: disc;
`

type MarkdownDescriptionProps = {
  markdownString: string
}

const MarkdownDescription = ({ markdownString }: MarkdownDescriptionProps) => {
  return (
    <Markdown
      options={{
        overrides: {
          h1: { component: Title },
          ul: { component: BulletPointContainer },
          li: { component: TopicItem },
        },
      }}
    >
      {markdownString}
    </Markdown>
  )
}

export default MarkdownDescription
