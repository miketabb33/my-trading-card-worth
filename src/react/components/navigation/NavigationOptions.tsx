import React from 'react'
import styled, { css } from 'styled-components'
import RouterLink from '../../router/RouterLink'
import { PATH_VALUES } from '../../router/pathValues'
import { useRouter } from '../../router/useRouter'

const OptionList = styled.ul`
  display: flex;
  height: 100%;
`

const OptionItem = styled.li`
  height: 100%;
`

const OptionContent = styled.p``

const SelectedOption = css`
  background-color: ${({ theme }) => theme.staticColor.gray_100};
  transform: translateY(-0.15rem);
  font-size: larger;
`

const Link = styled(RouterLink)<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  cursor: pointer;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  transition: all 0.2s;

  ${({ $selected }) => $selected && SelectedOption}

  &:hover {
    ${SelectedOption}
  }
`

const NavigationOptions = () => {
  const { collectionIsSelected, catalogIsSelected } = useInNavigationOptions()
  return (
    <OptionList>
      <OptionItem>
        <Link linkTo={PATH_VALUES.catalog()} $selected={catalogIsSelected}>
          <OptionContent id="NavCatalog">Catalog</OptionContent>
        </Link>
      </OptionItem>
      <OptionItem>
        <Link
          linkTo={PATH_VALUES.collection()}
          $selected={collectionIsSelected}
        >
          <OptionContent id="NavCollection">Collection</OptionContent>
        </Link>
      </OptionItem>
    </OptionList>
  )
}

export const useInNavigationOptions = () => {
  const { pathname } = useRouter()

  return {
    collectionIsSelected: pathname === '/collection',
    catalogIsSelected: pathname.includes('/catalog'),
  }
}

export default NavigationOptions
