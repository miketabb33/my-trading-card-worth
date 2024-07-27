import React from 'react'
import { ReactNode } from 'react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  gap: 1rem;
`

export type RowItemProps = {
  title: string
  value: ReactNode
}

export const DetailsRowItem = ({ title, value }: RowItemProps) => {
  return (
    <Row>
      <strong>{title}</strong>
      <p>{value}</p>
    </Row>
  )
}

export const PriceRowItem = ({ title, value }: RowItemProps) => {
  return (
    <p>
      <strong>{value}</strong> cards are <strong>{title}</strong>
    </p>
  )
}
