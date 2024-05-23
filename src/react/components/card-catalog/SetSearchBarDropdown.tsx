import React from 'react'
import styled from 'styled-components'
import { CardSetDto } from '../../../core/types/CardSetDto'

const Container = styled.div`
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

export type SetSearchBarDropdownProps = {
  filteredSets: CardSetDto[] | null
  onItemClick: (item: CardSetDto) => void
}

const SetSearchBarDropdown = ({
  filteredSets,
  onItemClick,
}: SetSearchBarDropdownProps) => {
  const showNoResults = filteredSets?.length === 0

  return (
    <Container>
      <Items>
        {filteredSets?.map((set) => (
          <Item key={set.id} onClick={() => onItemClick(set)}>
            <p>{set.name}</p>
          </Item>
        ))}
        {showNoResults && <p>No Results, refine your search</p>}
      </Items>
    </Container>
  )
}

export default SetSearchBarDropdown
