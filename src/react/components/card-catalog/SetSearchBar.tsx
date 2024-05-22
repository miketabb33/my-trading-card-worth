import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CardSetDto } from '../../../core/types/CardSetDto'
import { UseEffectType } from '../../types/UseEffectType'
import Popup, { usePopup } from '../Popup'
import { useSets } from '../../network/setsClient'

const Container = styled.div`
  position: relative;
`

const PopupContainer = styled.div`
  top: 3rem;
  z-index: 1;
  position: absolute;
  width: 100%;
  border: 1px solid black;
  border-top: none;
  background-color: white;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0.1rem 0.4rem 0.5rem rgba(0, 0, 0, 0.1);
`

const Items = styled.div`
  margin-top: 1rem;
  padding: 0.5rem 2rem;
  max-height: 50rem;
  overflow-y: scroll;
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

const Item = styled.div`
  cursor: pointer;
  padding: 0.3rem 0;
  border-radius: 0.5rem;

  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.staticColor.gray_200};
    padding-left: 1rem;
  }
`

type SetSearchBarProps = {
  inputValue: string
  filteredSets: CardSetDto[] | null
  showNoResults: boolean
  popupBind: { isShowing: boolean; closeHandlerEffect: UseEffectType }
  popupClick: (e?: React.MouseEvent<Element, MouseEvent> | undefined) => void
  onItemClick: (item: CardSetDto) => void
  onInputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SetSearchBar = ({
  inputValue,
  filteredSets,
  showNoResults,
  popupBind,
  popupClick,
  onItemClick,
  onInputValueChange,
}: SetSearchBarProps) => {
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
        <PopupContainer>
          <Items>
            {filteredSets?.map((set) => (
              <Item key={set.id} onClick={() => onItemClick(set)}>
                <p>{set.name}</p>
              </Item>
            ))}
            {showNoResults && <p>No Results, refine your search</p>}
          </Items>
        </PopupContainer>
      </Popup>
    </Container>
  )
}

type UseWithSetSearchBarReturn = {
  bind: SetSearchBarProps
  selectedSet: CardSetDto | null
}

export const useWithSetSearchBar = (): UseWithSetSearchBarReturn => {
  const { click: popupClick, bind: popupBind, toggle: togglePopup } = usePopup()
  const { data: sets } = useSets()
  const [inputValue, setInputValue] = useState('')
  const [filteredSets, setFilteredSets] = useState<CardSetDto[] | null>(null)
  const [selectedSet, setSelectedSet] = useState<CardSetDto | null>(null)

  useEffect(() => {
    if (sets) filterSets(inputValue)
  }, [sets])

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

  return {
    bind: {
      inputValue,
      filteredSets,
      showNoResults: filteredSets?.length === 0,
      popupBind,
      popupClick,
      onItemClick,
      onInputValueChange,
    },
    selectedSet,
  }
}

export default SetSearchBar
