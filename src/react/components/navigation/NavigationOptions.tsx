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

const OptionContent = styled.p`
  color: inherit;
  font-weight: 500;
  letter-spacing: 0.03em;
`

const SelectedOption = css`
  color: ${({ theme }) => theme.staticColor.gold_400};
  border-bottom: 2px solid ${({ theme }) => theme.staticColor.gold_400};
`

const Link = styled(RouterLink)<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding-right: 1.2rem;
  padding-left: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.staticColor.gray_300};
  border-bottom: 2px solid transparent;

  transition: all 0.2s;

  ${({ $selected }) => $selected && SelectedOption}

  &:hover {
    ${SelectedOption}
  }
`

const NavigationOptions = () => {
  const { collectionIsSelected, catalogIsSelected, seriesIsSelected } = useInNavigationOptions()
  return (
    <OptionList>
      <OptionItem>
        <Link linkTo={PATH_VALUES.catalog()} $selected={catalogIsSelected}>
          <OptionContent id="NavCatalog">Catalog</OptionContent>
        </Link>
      </OptionItem>
      <OptionItem>
        <Link linkTo={PATH_VALUES.collection()} $selected={collectionIsSelected}>
          <OptionContent id="NavCollection">Collection</OptionContent>
        </Link>
      </OptionItem>
      <OptionItem>
        <Link linkTo={PATH_VALUES.series} $selected={seriesIsSelected}>
          <OptionContent>Series</OptionContent>
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
    seriesIsSelected: pathname === PATH_VALUES.series,
  }
}

export default NavigationOptions
