import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CardSetDto } from '../../../core/types/CardSetDto'
import { UseEffectType } from '../../types/UseEffectType'
import Popup, { usePopup } from '../Popup'
import { useSets } from '../../network/setsClient'
import SetSearchBarDropdown, {
  SetSearchBarDropdownProps,
} from './SetSearchBarDropdown'

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

export type SetSearchBarProps = {
  inputValue: string
  popupBind: { isShowing: boolean; closeHandlerEffect: UseEffectType }
  dropdownBind: SetSearchBarDropdownProps
  filterSetsEffect: UseEffectType
  popupClick: (e?: React.MouseEvent<Element, MouseEvent> | undefined) => void
  onInputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SetSearchBar = ({
  inputValue,
  popupBind,
  dropdownBind,
  filterSetsEffect,
  popupClick,
  onInputValueChange,
}: SetSearchBarProps) => {
  useEffect(filterSetsEffect.effect, filterSetsEffect.deps)

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
        <SetSearchBarDropdown {...dropdownBind} />
      </Popup>
    </Container>
  )
}

export type UseWithSetSearchBarReturn = {
  bind: SetSearchBarProps
  selectedSet: CardSetDto | null
}

export const useWithSetSearchBar = (): UseWithSetSearchBarReturn => {
  const { click: popupClick, bind: popupBind, toggle: togglePopup } = usePopup()
  const { data: sets } = useSets()
  const [inputValue, setInputValue] = useState('')
  const [filteredSets, setFilteredSets] = useState<CardSetDto[] | null>(null)
  const [selectedSet, setSelectedSet] = useState<CardSetDto | null>(null)

  const filterSetsEffect: UseEffectType = {
    effect: () => {
      if (sets) filterSets(inputValue)
    },
    deps: [sets],
  }

  const onItemClick = (item: CardSetDto) => {
    setInputValue(item.name)
    togglePopup()
    setSelectedSet(item)
  }

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    filterSets(newValue)
  }

  const filterSets = (newValue: string) => {
    if (!sets) return
    if (inputValue === '') {
      setFilteredSets(sets)
    } else {
      const searchedSets = sets.filter((set) => {
        const downcaseSetName = set.name.toLowerCase()
        const downcaseNewValue = newValue.toLowerCase()
        const betterESetName = downcaseSetName.replace(/é/g, 'e')
        return betterESetName.includes(downcaseNewValue)
      })
      setFilteredSets(searchedSets)
    }
  }

  const dropdownBind = {
    filteredSets,
    onItemClick,
  }

  return {
    bind: {
      inputValue,
      popupBind,
      dropdownBind,
      filterSetsEffect,
      popupClick,
      onInputValueChange,
    },
    selectedSet,
  }
}

export default SetSearchBar
