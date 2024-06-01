import styled from 'styled-components'

export const Button = styled.button`
  padding: 0.5rem;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  &:hover:enabled {
    transform: translateY(-1px);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: none;
  }
`
