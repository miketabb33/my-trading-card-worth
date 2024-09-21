import React from 'react'
import styled from 'styled-components'
import RouterLink from '../../../router/RouterLink'
import { textLinkBase } from './TextLinkBase'

const Button = styled.button`
  ${textLinkBase}
`

const Link = styled(RouterLink)`
  ${textLinkBase}
`

type InternalTextLinkProps = {
  label: string
  onClick?: () => void
  pathValue?: string
  id?: string
}

const InternalTextLink = ({ onClick, label, pathValue, id }: InternalTextLinkProps) => {
  if (onClick)
    return (
      <Button id={id} onClick={onClick}>
        {label}
      </Button>
    )
  if (pathValue)
    return (
      <Link id={id} linkTo={pathValue}>
        {label}
      </Link>
    )
  return <></>
}

export default InternalTextLink
