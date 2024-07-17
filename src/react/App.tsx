import React from 'react'
import { StyledProvider } from './providers/StyledProvider'
import GlobalOverlays from './GlobalOverlays'
import { GlobalPopupContextProvider } from './providers/GlobalPopupProvider'
import { ProfileContextProvider } from './providers/ProfileProvider'
import Router from './router/Router'
import { ExpansionContextProvider } from './providers/ExpansionProvider'
import { StoreStatusContextProvider } from './providers/StoreStatusProvider'

const App = () => {
  return (
    <React.StrictMode>
      <ProfileContextProvider>
        <ExpansionContextProvider>
          <StoreStatusContextProvider>
            <GlobalPopupContextProvider>
              <StyledProvider>
                <GlobalOverlays />
                <Router />
              </StyledProvider>
            </GlobalPopupContextProvider>
          </StoreStatusContextProvider>
        </ExpansionContextProvider>
      </ProfileContextProvider>
    </React.StrictMode>
  )
}

export default App
