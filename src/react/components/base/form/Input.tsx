import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const InputStyles = styled.input`
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

export type InputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}

const Input = ({ value, onChange, onClick }: InputProps) => {
  return (
    <InputWrapper>
      <InputStyles onChange={onChange} onClick={onClick} value={value} />
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

export const useWithInput = ({
  onClick,
  onChange,
}: UseWithInputArgs): UseWithInputReturn => {
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
