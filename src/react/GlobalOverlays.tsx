import React from 'react'
import GlobalPopup from './GlobalPopup'
import { useGlobalPopup } from './providers/GlobalPopupProvider'

const GlobalOverlays = () => {
  const { popupBind, children } = useGlobalPopup()
  return (
    <>
      <GlobalPopup bind={popupBind}>{children}</GlobalPopup>
    </>
  )
}

export default GlobalOverlays
