import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  user-select: none;
  pointer-events: auto;

  padding: 1.5rem 2.5rem;
  border-radius: 5rem;
  border: 0;
  font-size: 1.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  }
`

const ScrollToTopButton = () => {
  return <Button onClick={() => window.scrollTo(0, 0)}>Back To Top</Button>
}

export default ScrollToTopButton
