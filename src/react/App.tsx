import React from 'react'
import { StyledProvider } from './providers/StyledProvider'
import HomePage from './pages/HomePage'
import GlobalOverlays from './GlobalOverlays'
import { GlobalPopupContextProvider } from './providers/GlobalPopupProvider'

const App = () => {
  return (
    <React.StrictMode>
      <GlobalPopupContextProvider>
        <StyledProvider>
          <GlobalOverlays />
          <HomePage />
        </StyledProvider>
      </GlobalPopupContextProvider>
    </React.StrictMode>
  )
}

export default App
