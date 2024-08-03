import styled from 'styled-components'
import { textLinkBase } from './TextLinkBase'
import { ReactNode } from 'react'
import React from 'react'

const Anchor = styled.a`
  ${textLinkBase}
`

type ExternalTextLinkProps = {
  href: string
  children: ReactNode
}

const ExternalTextLink = ({ href, children }: ExternalTextLinkProps) => {
  return (
    <Anchor href={href} target="_blank" rel="noreferrer">
      {children}
    </Anchor>
  )
}

export default ExternalTextLink
