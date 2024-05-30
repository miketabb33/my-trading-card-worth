import styled from 'styled-components'

export const Button = styled.button`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: none;
  }
`
