import { UseWithInputReturn } from '../../../src/react/components/base/form/Input'

export const USE_WITH_INPUT_RETURN: UseWithInputReturn = {
  bind: {
    value: '',
    onChange: () => {
      throw new Error('Function not implemented.')
    },
    onClick: () => {
      throw new Error('Function not implemented.')
    },
  },
  value: '',
  setValue: () => {
    throw new Error('Function not implemented.')
  },
}
