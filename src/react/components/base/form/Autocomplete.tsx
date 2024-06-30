import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { UseEffectType } from '../../../types/UseEffectType'
import Popup, { usePopup } from '../../Popup'
import InputFieldDropdown, {
  DropdownOption,
  InputFieldDropdownProps,
} from './utilities/InputFieldDropdown'
import { filterAutocomplete } from './utilities/filterAutocomplete'

const Container = styled.div`
  position: relative;
`

const Input = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 2rem;

  &:focus {
    outline: none;
  }
`

const InputWrapper = styled.div`
  padding: 0.5rem 2rem;
  border: 1px solid black;
  border-radius: 0.5rem;
`

export type AutocompleteProps<T> = {
  inputValue: string
  popupBind: { isShowing: boolean; closeHandlerEffect: UseEffectType }
  dropdownBind: InputFieldDropdownProps<T>
  setsLoadedEffect: UseEffectType
  popupClick: (e: React.MouseEvent<Element, MouseEvent>) => void
  onInputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Autocomplete = <T extends object>({
  inputValue,
  popupBind,
  dropdownBind,
  setsLoadedEffect,
  popupClick,
  onInputValueChange,
}: AutocompleteProps<T>) => {
  useEffect(setsLoadedEffect.effect, setsLoadedEffect.deps)

  return (
    <Container>
      <InputWrapper>
        <Input
          onChange={onInputValueChange}
          onClick={popupClick}
          value={inputValue}
        />
      </InputWrapper>
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

  const [inputValue, setInputValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<DropdownOption<T>[]>(
    options || []
  )
  const [selectedOption, setSelectedOption] =
    useState<DropdownOption<T> | null>(null)

  const setsLoadedEffect: UseEffectType = {
    effect: () => {
      if (options) setFilteredOptions(options)
    },
    deps: [options],
  }

  const onOptionClick = (option: DropdownOption<T>) => {
    setInputValue(option.title)
    setSelectedOption(option)
    if (didSelectOption) didSelectOption(option.data)
    togglePopup()
  }

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setFilteredOptions(filterAutocomplete(options, newValue))
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
      inputValue,
      popupBind,
      dropdownBind,
      setsLoadedEffect,
      popupClick,
      onInputValueChange,
    },
    selectedOption: selectedOption?.data || null,
    setOptions,
  }
}

export default Autocomplete
