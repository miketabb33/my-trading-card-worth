import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const InputStyles = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.staticColor.gray_900};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.staticColor.gray_400};
  }
`

const InputWrapper = styled.div`
  padding: 0.5rem 2rem;
  border: 1px solid ${({ theme }) => theme.staticColor.gray_300};
  border-radius: 0.5rem;
  background-color: #ffffff;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ theme }) => theme.staticColor.gold_500};
  }
`

export type InputProps = {
  value: string
  id?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}

const Input = ({ value, id, onChange, onClick }: InputProps) => {
  return (
    <InputWrapper>
      <InputStyles id={id} onChange={onChange} onClick={onClick} value={value} />
    </InputWrapper>
  )
}

type UseWithInputArgs = {
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  onChange?: (value: string) => void
}

export type UseWithInputReturn = {
  bind: InputProps
  value: string
  setValue: (value: string) => void
}

export const useWithInput = ({ onClick, onChange }: UseWithInputArgs): UseWithInputReturn => {
  const [value, setValue] = useState('')

  const emptyFunc = () => {}

  return {
    bind: {
      value,
      onChange: (e) => {
        const newValue = e.target.value
        setValue(newValue)
        if (onChange) onChange(newValue)
      },
      onClick: onClick ?? emptyFunc,
    },
    value,
    setValue,
  }
}

export default Input
