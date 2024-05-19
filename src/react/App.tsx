import React from 'react'
import { StyledProvider } from './providers/StyledProvider'
import Home from './Home'

const App = () => {
  return (
    <React.StrictMode>
      <StyledProvider>
        <Home />
      </StyledProvider>
    </React.StrictMode>
  )
}

export default App
