import React, { ReactNode } from 'react'
import Popup, { UsePopupBind } from './components/Popup'
import styled from 'styled-components'

const Position = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
type GlobalPopupProps = {
  bind: UsePopupBind
  children: ReactNode
}

const GlobalPopup = ({ bind, children }: GlobalPopupProps) => {
  return (
    <Popup {...bind}>
      <Position>{children}</Position>
    </Popup>
  )
}

export default GlobalPopup
