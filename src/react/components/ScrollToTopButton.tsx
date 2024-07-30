import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button<{ $isHidden: boolean }>`
  user-select: none;
  position: fixed;
  top: 3rem;
  left: 50%;
  transform: translate(-50%, 0);

  padding: 1.5rem 2.5rem;
  border-radius: 5rem;
  border: 0;
  font-size: 1.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  transition:
    transform 0.2s,
    box-shadow 0.2s,
    visibility 0s,
    opacity 0.5s linear;

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

  &:hover {
    transform: translate(-50%, -2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  }
`

const ScrollToTopButton = () => {
  const [hidden, setHidden] = useState(true)

  const toggleButton = () => {
    if (window.scrollY > 2_000) {
      if (hidden) setHidden(false)
    } else {
      if (!hidden) setHidden(true)
    }
  }

  useEffect(() => {
    addEventListener('scroll', toggleButton)
    return () => removeEventListener('scroll', toggleButton)
  }, [hidden])

  return (
    <Button $isHidden={hidden} onClick={() => window.scrollTo(0, 0)}>
      Back To Top
    </Button>
  )
}

export default ScrollToTopButton
