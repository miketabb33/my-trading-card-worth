import styled, { css } from 'styled-components'
import { fetchSet, useSetsData } from '../../network/setsClient'
import Autocomplete, { useWithAutocomplete } from '../base/form/Autocomplete'
import React, { useEffect, useState } from 'react'
import { CardBlueprintDto, SetDto } from '../../../core/types/CardBlueprintDto'
import { UseEffectType } from '../../types/UseEffectType'
import CardCatalogItem from './CardCatalogItem'
import { CardSetDto } from '../../../core/types/CardSetDto'
import { DropdownOption } from '../base/form/utilities/InputFieldDropdown'
import CardCatalogSetDetails from './CardCatalogSetDetails'
import { tabLandAndUp } from '../../styles/Responsive'

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
    fetchBlueprintEffect,
    setsLoadedEffect,
    refreshBlueprints,
  } = useInCardCatalog()

  useEffect(fetchBlueprintEffect.effect, fetchBlueprintEffect.deps)
  useEffect(setsLoadedEffect.effect, setsLoadedEffect.deps)

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
  const { data: sets } = useSetsData()

  const {
    bind: setSearchBarBind,
    selectedOption: selectedSet,
    setOptions,
  } = useWithAutocomplete<CardSetDto>()

  const [set, setSet] = useState<SetDto | null>(null)
  const [filteredSet, setFilteredSet] = useState<CardBlueprintDto[]>([])

  const setsLoadedEffect: UseEffectType = {
    effect: () => {
      if (sets) {
        const newOptions: DropdownOption<CardSetDto>[] = sets.map((set) => ({
          data: set,
          title: set.name,
          imageSource: set.symbol,
        }))
        setOptions(newOptions)
      }
    },
    deps: [sets],
  }

  const fetchBlueprints = () => {
    if (selectedSet) {
      fetchSet(selectedSet.cardTraderExpansionId)
        .then((res) => {
          setSet(res.data)
          setFilteredSet(res.data?.blueprints.sort(sortByHighestMedian) ?? [])
        })
        .catch((err) => console.log(err))
    }
  }

  const sortByHighestMedian = (a: CardBlueprintDto, b: CardBlueprintDto) => {
    return b.medianMarketValueCents - a.medianMarketValueCents
  }

  const fetchBlueprintEffect: UseEffectType = {
    effect: fetchBlueprints,
    deps: [selectedSet],
  }

  return {
    setSearchBarBind,
    blueprints: filteredSet,
    details: set?.details || null,
    fetchBlueprintEffect,
    setsLoadedEffect,
    refreshBlueprints: fetchBlueprints,
  }
}
export default CardCatalog
