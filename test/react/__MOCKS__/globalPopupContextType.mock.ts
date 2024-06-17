import { GlobalPopupContextType } from '../../../src/react/providers/GlobalPopupProvider'

export const GLOBAL_CONTEXT_POPUP_CONTEXT: GlobalPopupContextType = {
  show: () => {},
  popupBind: {
    isShowing: false,
    closeHandlerEffect: { effect: () => {} },
  },
  children: 'children',
}
