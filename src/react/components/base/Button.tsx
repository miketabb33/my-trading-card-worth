import styled from 'styled-components'

export const Button = styled.button`
  padding: 0.6rem 1.4rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.staticColor.gray_900};
  color: ${({ theme }) => theme.staticColor.gray_100};
  border: 1px solid ${({ theme }) => theme.staticColor.gray_700};
  border-radius: 0.4rem;
  font-weight: 500;
  font-size: 1.4rem;
  transition: all 0.2s;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &:hover:enabled {
    border-color: ${({ theme }) => theme.staticColor.gold_400};
    color: ${({ theme }) => theme.staticColor.gold_400};
    transform: translateY(-1px);
  }

  &:active {
    transform: none;
  }
`
