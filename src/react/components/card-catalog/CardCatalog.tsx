import styled, { css } from 'styled-components'
import { fetchSet } from '../../network/setsClient'
import Autocomplete, { useWithAutocomplete } from '../base/form/Autocomplete'
import React, { useEffect, useState } from 'react'
import { CardBlueprintDto, SetDto } from '../../../core/types/CardBlueprintDto'
import { UseEffectType } from '../../types/UseEffectType'
import CardCatalogItem from './CardCatalogItem'
import { CardSetDto } from '../../../core/types/CardSetDto'
import { DropdownOption } from '../base/form/utilities/InputFieldDropdown'
import CardCatalogSetDetails from './CardCatalogSetDetails'
import { tabLandAndUp } from '../../styles/Responsive'
import { useRouter } from '../../router/useRouter'
import { useExpansion } from '../../providers/ExpansionProvider'

const Container = styled.div`
  margin-top: 1rem;
`

const CardsHeader = styled.h1`
  margin-top: 2rem;
`

const Catalog = styled.div`
  display: grid;

  ${tabLandAndUp(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`

const CardCatalog = () => {
  const {
    setSearchBarBind,
    blueprints,
    details,
    setsLoadedEffect,
    fetchBlueprintEffect,
    refreshBlueprints,
  } = useInCardCatalog()

  useEffect(setsLoadedEffect.effect, setsLoadedEffect.deps)
  useEffect(fetchBlueprintEffect.effect, fetchBlueprintEffect.deps)

  return (
    <Container>
      <p>Search Pokemon Cards by set</p>
      <Autocomplete {...setSearchBarBind} />
      {details && <CardCatalogSetDetails details={details} />}
      {blueprints.length > 0 && <CardsHeader>Cards:</CardsHeader>}
      <Catalog>
        {blueprints.map((blueprint) => (
          <CardCatalogItem
            key={blueprint.cardTraderBlueprintId}
            blueprint={blueprint}
            refreshBlueprints={refreshBlueprints}
          />
        ))}
      </Catalog>
    </Container>
  )
}

export const useInCardCatalog = () => {
  const { expansions } = useExpansion()
  const { getParam, navigateTo } = useRouter()
  const expansionId = getParam('expansionId')

  const fetchBlueprints = () => {
    if (!expansionId) return
    fetchSet(+expansionId)
      .then((res) => {
        setSelectedSet(res.data)
        setFilteredSet(res.data?.blueprints.sort(sortByHighestMedian) ?? [])
      })
      .catch((err) => console.log(err))
  }

  const { bind: setSearchBarBind, setOptions } =
    useWithAutocomplete<CardSetDto>({
      didSelectOption: (option) =>
        navigateTo(`/${option.cardTraderExpansionId}`),
    })

  const [selectedSet, setSelectedSet] = useState<SetDto | null>(null)
  const [filteredSet, setFilteredSet] = useState<CardBlueprintDto[]>([])

  const setsLoadedEffect: UseEffectType = {
    effect: () => {
      if (expansions) {
        const newOptions: DropdownOption<CardSetDto>[] = expansions.map(
          (expansion) => ({
            data: expansion,
            title: expansion.name,
            imageSource: expansion.symbol,
          })
        )
        setOptions(newOptions)
      }
    },
    deps: [expansions],
  }

  const fetchBlueprintEffect: UseEffectType = {
    effect: fetchBlueprints,
    deps: [expansionId],
  }

  const sortByHighestMedian = (a: CardBlueprintDto, b: CardBlueprintDto) => {
    return b.medianMarketValueCents - a.medianMarketValueCents
  }

  return {
    setSearchBarBind,
    blueprints: filteredSet,
    details: selectedSet?.details || null,
    setsLoadedEffect,
    fetchBlueprintEffect,
    refreshBlueprints: fetchBlueprints,
  }
}
export default CardCatalog
