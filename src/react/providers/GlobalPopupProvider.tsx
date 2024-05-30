import React, { ReactNode, useState } from 'react'
import { createContext, useContext } from 'react'
import { ChildrenProp } from '../types/ChildrenProp'
import { UsePopupBind, usePopup } from '../components/Popup'

export type GlobalPopupContextType = {
  show: (e: React.MouseEvent<Element, MouseEvent>, content: ReactNode) => void
  popupBind: UsePopupBind
  children: ReactNode
}

const GlobalPopupContext = createContext<GlobalPopupContextType>({
  show: () => {},
  popupBind: {
    isShowing: false,
    closeHandlerEffect: { effect: () => {} },
  },
  children: <></>,
})

export const useGlobalPopupProvider = () => {
  const { bind, click } = usePopup()
  const [children, setChildren] = useState<ReactNode | null>(null)

  const show = (
    e: React.MouseEvent<Element, MouseEvent>,
    content: ReactNode
  ) => {
    click(e)
    setChildren(content)
  }

  return { show, popupBind: bind, children }
}

export const GlobalPopupContextProvider = ({ children }: ChildrenProp) => {
  const value = useGlobalPopupProvider()
  return (
    <GlobalPopupContext.Provider value={value}>
      {children}
    </GlobalPopupContext.Provider>
  )
}

export const useGlobalPopup = (): GlobalPopupContextType => {
  return useContext(GlobalPopupContext)
}
