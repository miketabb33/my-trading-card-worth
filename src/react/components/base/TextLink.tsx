import React from 'react'
import styled, { css } from 'styled-components'
import RouterLink from '../../router/RouterLink'

const base = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  color: ${({ theme }) => theme.staticColor.blue_600};
  transition: all 0.2s;

  font-size: inherit;

  &:hover {
    color: ${({ theme }) => theme.staticColor.blue_400};
  }
`

const Button = styled.button`
  ${base}
`

const Link = styled(RouterLink)`
  ${base}
`

type TextLinkProps = {
  label: string
  onClick?: () => void
  pathValue?: string
}

const TextLink = ({ onClick, label, pathValue }: TextLinkProps) => {
  if (onClick) return <Button onClick={onClick}>{label}</Button>
  if (pathValue) return <Link linkTo={pathValue}>{label}</Link>
  return <></>
}

export default TextLink
