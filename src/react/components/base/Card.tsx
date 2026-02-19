import styled from 'styled-components'

type CardVariant = 'default' | 'dark'

export const Card = styled.div<{ $variant?: CardVariant }>`
  border-radius: 16px;
  border: 1px solid ${({ $variant }) => ($variant === 'dark' ? 'rgba(232, 160, 20, 0.15)' : 'rgba(0, 0, 0, 0.08)')};
  background: ${({ $variant }) => ($variant === 'dark' ? '#0a0b14' : '#ffffff')};
  box-shadow: ${({ $variant }) =>
    $variant === 'dark' ? '0 8px 48px rgba(0, 0, 0, 0.18)' : '0 2px 12px rgba(0, 0, 0, 0.06)'};
`
