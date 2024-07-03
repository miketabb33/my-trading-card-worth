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
import { PATH_VALUES } from '../../router/pathValues'

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
    autocompleteBind,
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
      <Autocomplete {...autocompleteBind} />
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
  const expansionSlug = getParam('expansionSlug')
  const [selectedSet, setSelectedSet] = useState<SetDto | null>(null)
  const [filteredSet, setFilteredSet] = useState<CardBlueprintDto[]>([])

  const fetchBlueprints = () => {
    if (!expansionSlug) return
    const selectedExpansion = expansions?.find(
      (expansion) => expansion.slug === expansionSlug
    )
    if (!selectedExpansion) return
    fetchSet(selectedExpansion.cardTraderExpansionId)
      .then((res) => {
        setSelectedSet(res.data)
        setFilteredSet(res.data?.blueprints.sort(sortByHighestMedian) ?? [])
      })
      .catch((err) => console.log(err))
  }

  const sortByHighestMedian = (a: CardBlueprintDto, b: CardBlueprintDto) => {
    return b.medianMarketValueCents - a.medianMarketValueCents
  }

  const { bind: autocompleteBind, setOptions } =
    useWithAutocomplete<CardSetDto>({
      didSelectOption: (option) => navigateTo(PATH_VALUES.catalog(option.slug)),
    })

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
    deps: [expansionSlug, expansions],
  }

  return {
    autocompleteBind,
    blueprints: filteredSet,
    details: selectedSet?.details || null,
    setsLoadedEffect,
    fetchBlueprintEffect,
    refreshBlueprints: fetchBlueprints,
  }
}
export default CardCatalog
