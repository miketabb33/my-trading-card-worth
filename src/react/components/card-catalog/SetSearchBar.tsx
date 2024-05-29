import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CardSetDto } from '../../../core/types/CardSetDto'
import { UseEffectType } from '../../types/UseEffectType'
import Popup, { usePopup } from '../Popup'
import { useSetsData } from '../../network/setsClient'
import SetSearchBarDropdown, {
  SetSearchBarDropdownProps,
} from './SetSearchBarDropdown'
import { filterSets } from './filterSets'

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
  setsLoadedEffect: UseEffectType
  popupClick: (e: React.MouseEvent<Element, MouseEvent>) => void
  onInputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SetSearchBar = ({
  inputValue,
  popupBind,
  dropdownBind,
  setsLoadedEffect,
  popupClick,
  onInputValueChange,
}: SetSearchBarProps) => {
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
  const { data: sets } = useSetsData()
  const [inputValue, setInputValue] = useState('')
  const [filteredSets, setFilteredSets] = useState<CardSetDto[]>([])
  const [selectedSet, setSelectedSet] = useState<CardSetDto | null>(null)

  const setsLoadedEffect: UseEffectType = {
    effect: () => {
      if (sets) setFilteredSets(sets)
    },
    deps: [sets],
  }

  const onItemClick = (item: CardSetDto) => {
    setInputValue(item.name)
    setSelectedSet(item)
    togglePopup()
  }

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setFilteredSets(filterSets(sets, newValue))
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
      setsLoadedEffect,
      popupClick,
      onInputValueChange,
    },
    selectedSet,
  }
}

export default SetSearchBar
