import styled, { css } from 'styled-components'

type ButtonVariant = 'default' | 'primary' | 'ghost'

const primaryStyles = css`
  background: #e8a020;
  border-color: #e8a020;
  color: #0a0b14;
  font-weight: 600;

  &:hover:enabled {
    background: #f5c433;
    border-color: #f5c433;
    color: #0a0b14;
    transform: none;
  }
`

const ghostStyles = css`
  background: transparent;
  border-color: rgba(240, 234, 216, 0.2);
  color: rgba(240, 234, 216, 0.6);

  &:hover:enabled {
    border-color: rgba(232, 160, 20, 0.4);
    color: #e8a020;
    transform: none;
  }
`

export const Button = styled.button<{ $variant?: ButtonVariant }>`
  padding: 0.75rem 1.8rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.staticColor.gray_900};
  color: ${({ theme }) => theme.staticColor.gray_100};
  border: 1px solid ${({ theme }) => theme.staticColor.gray_700};
  border-radius: 6px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 1.3rem;
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

  ${({ $variant }) => $variant === 'primary' && primaryStyles}
  ${({ $variant }) => $variant === 'ghost' && ghostStyles}
`
