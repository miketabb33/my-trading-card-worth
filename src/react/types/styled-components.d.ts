import { colorTokens } from '../styles/colorTokens'

declare module 'styled-components' {
  export interface DefaultTheme {
    staticColor: typeof colorTokens
  }
}
