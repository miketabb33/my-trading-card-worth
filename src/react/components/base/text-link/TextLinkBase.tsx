import { css } from 'styled-components'

export const textLinkBase = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  color: ${({ theme }) => theme.staticColor.gold_500};
  transition: all 0.2s;
  font-size: inherit;

  &:hover {
    color: ${({ theme }) => theme.staticColor.gold_400};
  }
`
