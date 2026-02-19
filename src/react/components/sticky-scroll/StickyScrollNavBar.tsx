import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { ChildrenProp } from '../../types/ChildrenProp'

const Bar = styled.div<{ $isHidden: boolean }>`
  position: fixed;
  top: 3rem;
  left: 0;
  right: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem;
  pointer-events: none;

  @media (min-width: 650px) {
    justify-content: center;
    padding: 0;
  }

  transition:
    visibility 0s,
    opacity 0.5s linear;

  & > * {
    pointer-events: auto;
  }

  ${({ $isHidden }) =>
    $isHidden
      ? css`
          visibility: hidden;
          opacity: 0;
        `
      : css`
          visibility: visible;
          opacity: 1;
        `};
`

const StickyScrollNavBar = ({ children }: ChildrenProp) => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const toggle = () => {
      if (window.scrollY > 2_000) {
        if (hidden) setHidden(false)
      } else {
        if (!hidden) setHidden(true)
      }
    }

    addEventListener('scroll', toggle)
    return () => removeEventListener('scroll', toggle)
  }, [hidden])

  return <Bar $isHidden={hidden}>{children}</Bar>
}

export default StickyScrollNavBar
