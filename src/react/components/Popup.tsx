import { ReactNode, Ref, forwardRef, useEffect, useRef, useState } from 'react'
import { UseEffectType } from '../types/UseEffectType'
import React from 'react'

export type PopupProps = {
  children: ReactNode
  isShowing: boolean
  closeHandlerEffect: UseEffectType
}

const Popup = forwardRef(
  (
    { children, isShowing, closeHandlerEffect }: PopupProps,
    ref: Ref<HTMLDivElement>
  ) => {
    useEffect(closeHandlerEffect.effect, closeHandlerEffect.deps)
    if (isShowing) return <div ref={ref}>{children}</div>
    return <></>
  }
)

Popup.displayName = 'Popup'

export type UsePopupReturn = {
  bind: {
    ref: React.RefObject<HTMLDivElement>
    isShowing: boolean
    closeHandlerEffect: UseEffectType
  }
  click: (e?: React.MouseEvent<Element, MouseEvent>) => void
  toggle: () => void
}

export const usePopup = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isShowing, setIsShowing] = useState(false)

  const closeHandler = (event: MouseEvent) => {
    const shouldClose =
      ref.current !== null && !ref.current.contains(event.target as Node)
    if (shouldClose) setIsShowing(false)
  }

  const click = (e?: React.MouseEvent<Element, MouseEvent>) => {
    e?.stopPropagation()
    toggle()
  }

  const toggle = () => {
    setIsShowing((val) => !val)
  }

  const closeHandlerEffect: UseEffectType = {
    effect: () => {
      if (isShowing) document.addEventListener('click', closeHandler)
      return () => {
        if (isShowing) document.removeEventListener('click', closeHandler)
      }
    },
    deps: [isShowing],
  }

  return {
    bind: {
      ref,
      isShowing,
      closeHandlerEffect,
    },
    click,
    toggle,
  }
}

export default Popup
