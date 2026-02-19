import styled, { keyframes } from 'styled-components'

const goldFlow = keyframes`
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
`

export const GoldWord = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #b87010, #f5c433 30%, #ffd060 50%, #e8a020 70%, #c88020);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${goldFlow} 4s linear infinite;
`
