import { DefaultTheme, ThemeProvider } from 'styled-components'
import { ChildrenProp } from '../types/ChildrenProp'
import React from 'react'
import { colorTokens } from '../styles/colorTokens'

export const StyledProvider = ({ children }: ChildrenProp) => {
  const getTheme = (): DefaultTheme => {
    return {
      staticColor: colorTokens,
    }
  }
  return <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
}
