import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { UseEffectType } from '../../../types/UseEffectType'
import Popup, { usePopup } from '../../Popup'
import InputFieldDropdown, {
  DropdownOption,
  InputFieldDropdownProps,
} from './utilities/InputFieldDropdown'
import { filterAutocomplete } from './utilities/filterAutocomplete'
import Input, { InputProps, useWithInput } from './Input'

const Container = styled.div`
  position: relative;
`

export type AutocompleteProps<T> = {
  inputBind: InputProps
  popupBind: { isShowing: boolean; closeHandlerEffect: UseEffectType }
  dropdownBind: InputFieldDropdownProps<T>
  optionsChangedEffect: UseEffectType
}

const Autocomplete = <T extends object>({
  popupBind,
  dropdownBind,
  optionsChangedEffect,
  inputBind,
}: AutocompleteProps<T>) => {
  useEffect(optionsChangedEffect.effect, optionsChangedEffect.deps)

  return (
    <Container>
      <Input {...inputBind} />
      <Popup {...popupBind}>
        <InputFieldDropdown {...dropdownBind} />
      </Popup>
    </Container>
  )
}

export type UseWithAutocompleteReturn<T> = {
  bind: AutocompleteProps<T>
  selectedOption: T | null
  setOptions: (option: DropdownOption<T>[]) => void
}

type UseWithAutocompleteArgs<T> = {
  initOptions?: DropdownOption<T>[]
  didSelectOption?: (option: T) => void
}

export const useWithAutocomplete = <T extends object>({
  initOptions,
  didSelectOption,
}: UseWithAutocompleteArgs<T>): UseWithAutocompleteReturn<T> => {
  const { bind: popupBind, click: popupClick, toggle: togglePopup } = usePopup()

  const [options, setOptions] = useState<DropdownOption<T>[]>(initOptions ?? [])

  const [filteredOptions, setFilteredOptions] = useState<DropdownOption<T>[]>(
    options || []
  )
  const [selectedOption, setSelectedOption] =
    useState<DropdownOption<T> | null>(null)

  const optionsChangedEffect: UseEffectType = {
    effect: () => {
      if (options) setFilteredOptions(options)
    },
    deps: [options],
  }

  const input = useWithInput({
    onClick: popupClick,
    onChange: (newValue) =>
      setFilteredOptions(filterAutocomplete(options, newValue)),
  })

  const onOptionClick = (option: DropdownOption<T>) => {
    input.setValue(option.title)
    setSelectedOption(option)
    if (didSelectOption) didSelectOption(option.data)
    togglePopup()
  }

  const dropdownBind: InputFieldDropdownProps<T> = {
    options: filteredOptions,
    noResultsText: 'No Results, refine your search',
    topAmount: '3rem',
    zIndexAmount: 1,
    onOptionClick,
  }

  return {
    bind: {
      popupBind,
      dropdownBind,
      optionsChangedEffect,
      inputBind: input.bind,
    },
    selectedOption: selectedOption?.data || null,
    setOptions,
  }
}

export default Autocomplete
