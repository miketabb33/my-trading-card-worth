import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { UseEffectType } from '../../../types/UseEffectType'
import InputFieldDropdown, {
  DropdownOption,
  InputFieldDropdownProps,
} from './utilities/InputFieldDropdown'
import { filterAutocomplete } from './utilities/filterAutocomplete'
import Input, { InputProps, useWithInput } from './Input'

const Container = styled.div`
  position: relative;
`

const DropdownDisplay = styled.div`
  visibility: hidden;
  opacity: 0;

  ${Container}:focus-within & {
    visibility: visible;
    opacity: 1;
  }
`

export type AutocompleteProps<T> = {
  inputBind: InputProps
  dropdownBind: InputFieldDropdownProps<T>
  optionsChangedEffect: UseEffectType
}

const Autocomplete = <T extends object>({
  optionsChangedEffect,
  inputBind,
  dropdownBind,
}: AutocompleteProps<T>) => {
  useEffect(optionsChangedEffect.effect, optionsChangedEffect.deps)

  return (
    <Container>
      <Input {...inputBind} />
      <DropdownDisplay>
        <InputFieldDropdown {...dropdownBind} />
      </DropdownDisplay>
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
    onChange: (newValue) =>
      setFilteredOptions(filterAutocomplete(options, newValue)),
  })

  const onOptionClick = (option: DropdownOption<T>) => {
    input.setValue(option.title)
    setSelectedOption(option)
    if (didSelectOption) didSelectOption(option.data)
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
      dropdownBind,
      optionsChangedEffect,
      inputBind: input.bind,
    },
    selectedOption: selectedOption?.data || null,
    setOptions,
  }
}

export default Autocomplete
