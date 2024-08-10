import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div<{ $top: string; $zIndex: number }>`
  top: ${({ $top }) => $top};
  z-index: ${({ $zIndex }) => $zIndex};
  position: absolute;
  width: 100%;
  border: 1px solid black;
  border-top: none;
  background-color: white;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0.1rem 0.4rem 0.5rem rgba(0, 0, 0, 0.1);
`

const Items = styled.div<{ $dropdownStyle: DropdownStyle }>`
  ${({ $dropdownStyle }) => css`
    margin-top: 1rem;
    padding: 0.5rem 2rem;
    max-height: 50rem;
    overflow-y: scroll;

    ${$dropdownStyle === 'small' &&
    css`
      margin-top: 0.3rem;
      padding: 0.5rem;
    `}
  `}
`

const RowImage = styled.img`
  height: 2.4rem;
`

const Item = styled.div<{ $dropdownStyle: DropdownStyle }>`
  ${({ theme, $dropdownStyle }) => css`
    cursor: pointer;
    padding: 0.3rem 0;
    border-radius: 0.5rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    &:hover {
      background-color: ${theme.staticColor.gray_200};
    }

    ${$dropdownStyle === 'small' &&
    css`
      font-size: 1.2rem;
      padding-left: 0.3rem;
    `}

    ${$dropdownStyle === 'default' &&
    css`
      font-size: 1.8rem;
      &:hover {
        padding-left: 1rem;
      }
    `}
  `}
`

type DropdownStyle = 'default' | 'small'

export type DropdownOption<T> = {
  title: string
  imageSource?: string | null
  data: T
}

export type InputFieldDropdownProps<T> = {
  options: DropdownOption<T>[]
  noResultsText?: string
  topAmount?: string
  zIndexAmount?: number
  dropdownStyle?: DropdownStyle
  id?: string | undefined
  onOptionClick: (optionData: DropdownOption<T>) => void
}

const InputFieldDropdown = <T extends object>({
  options,
  noResultsText = '',
  topAmount = '',
  zIndexAmount = 0,
  dropdownStyle = 'default',
  id,
  onOptionClick,
}: InputFieldDropdownProps<T>) => {
  const showNoResults = options.length === 0

  return (
    <Container $top={topAmount} $zIndex={zIndexAmount}>
      <Items $dropdownStyle={dropdownStyle}>
        {options.map((option, i) => {
          const itemId = id !== null ? `${id}-${i}` : undefined
          return (
            <Item
              $dropdownStyle={dropdownStyle}
              key={i}
              onClick={() => onOptionClick(option)}
              id={itemId}
            >
              {option.imageSource && <RowImage src={option.imageSource} />}
              <p>{option.title}</p>
            </Item>
          )
        })}
        {showNoResults && noResultsText && <p>{noResultsText}</p>}
      </Items>
    </Container>
  )
}

export default InputFieldDropdown
