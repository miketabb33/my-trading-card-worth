import React from 'react'
import { StyledProvider } from './providers/StyledProvider'
import HomePage from './pages/HomePage'
import GlobalOverlays from './GlobalOverlays'
import { GlobalPopupContextProvider } from './providers/GlobalPopupProvider'
import { ProfileContextProvider } from './providers/ProfileProvider'

const App = () => {
  return (
    <React.StrictMode>
      <ProfileContextProvider>
        <GlobalPopupContextProvider>
          <StyledProvider>
            <GlobalOverlays />
            <HomePage />
          </StyledProvider>
        </GlobalPopupContextProvider>
      </ProfileContextProvider>
    </React.StrictMode>
  )
}

export default App
