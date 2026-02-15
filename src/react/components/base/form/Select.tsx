import React, { useState } from 'react'
import styled from 'styled-components'
import Popup, { UsePopupBind, usePopup } from '../../Popup'
import InputFieldDropdown, { DropdownOption } from './utilities/InputFieldDropdown'

const Container = styled.div`
  position: relative;
  width: 13rem;
`

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: pointer;
  z-index: 10;
`

const Arrow = styled.i`
  border: solid ${({ theme }) => theme.staticColor.gray_600};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 0.3rem;
  position: absolute;
  right: 0.7rem;
  top: 0.6rem;
  transform: rotate(45deg);
`

const Input = styled.input`
  width: 100%;
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.staticColor.gray_300};
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: ${({ theme }) => theme.staticColor.gray_900};

  &:focus {
    outline: none;
  }
`

type SelectProps<T> = {
  popupBind: UsePopupBind
  selectedOptionTitle: string
  options: DropdownOption<T>[]
  onSelectClick: (e: React.MouseEvent<Element, MouseEvent>) => void
  onOptionClick: (option: DropdownOption<T>) => void
}

const Select = <T extends object>({
  popupBind,
  selectedOptionTitle,
  options,
  onSelectClick,
  onOptionClick,
}: SelectProps<T>) => {
  return (
    <Container>
      <div>
        <Overlay onClick={onSelectClick} />
        <Input value={selectedOptionTitle} readOnly />
        <Arrow />
      </div>
      <Popup {...popupBind}>
        <InputFieldDropdown options={options} topAmount="1.8rem" onOptionClick={onOptionClick} dropdownStyle="small" />
      </Popup>
    </Container>
  )
}

export const useWithSelect = <T extends object>(options: DropdownOption<T>[]) => {
  const [selectedOption, setSelectedOption] = useState(options[0])
  const { bind: popupBind, click: onSelectClick, toggle } = usePopup()

  const onOptionClick = (option: DropdownOption<T>) => {
    setSelectedOption(option)
    toggle()
  }

  return {
    bind: {
      popupBind,
      selectedOptionTitle: selectedOption.title,
      options,
      onSelectClick,
      onOptionClick,
    },
    selectedOption: selectedOption.data,
  }
}

export default Select
