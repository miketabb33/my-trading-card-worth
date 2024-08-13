import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type RouterLinkProps = {
  children: ReactNode
  linkTo: string
  className?: string
  id?: string | undefined
}

const NoStyleLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.staticColor.gray_900};
`

const RouterLink = ({ className, linkTo, children, id }: RouterLinkProps) => {
  return (
    <NoStyleLink id={id} to={linkTo} className={className}>
      {children}
    </NoStyleLink>
  )
}

export default RouterLink
