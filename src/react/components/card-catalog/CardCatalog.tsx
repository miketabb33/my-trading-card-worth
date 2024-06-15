import styled from 'styled-components'
import { fetchSet, useSetsData } from '../../network/setsClient'
import Autocomplete, { useWithAutocomplete } from '../base/form/Autocomplete'
import React, { useEffect, useState } from 'react'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { UseEffectType } from '../../types/UseEffectType'
import CardCatalogItem from './CardCatalogItem'
import { CardSetDto } from '../../../core/types/CardSetDto'

const Container = styled.div`
  margin-top: 1rem;
`

const CardCatalog = () => {
  const {
    setSearchBarBind,
    blueprints,
    fetchBlueprintEffect,
    setsLoadedEffect,
  } = useInCardCatalog()

  useEffect(fetchBlueprintEffect.effect, fetchBlueprintEffect.deps)
  useEffect(setsLoadedEffect.effect, setsLoadedEffect.deps)

  return (
    <Container>
      <p>Search Pokemon Cards by set</p>
      <Autocomplete {...setSearchBarBind} />
      {blueprints?.map((blueprint) => (
        <CardCatalogItem
          key={blueprint.cardTraderBlueprintId}
          blueprint={blueprint}
        />
      ))}
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

  const [blueprints, setBlueprints] = useState<CardBlueprintDto[] | null>(null)

  const setsLoadedEffect: UseEffectType = {
    effect: () => {
      if (sets) {
        const newOptions = sets.map((set) => ({ data: set, title: set.name }))
        setOptions(newOptions)
      }
    },
    deps: [sets],
  }

  const fetchBlueprintEffect: UseEffectType = {
    effect: () => {
      if (selectedSet) {
        fetchSet(selectedSet.cardTraderExpansionId)
          .then((res) => setBlueprints(res.data))
          .catch((err) => console.log(err))
      }
    },
    deps: [selectedSet],
  }

  return {
    setSearchBarBind,
    blueprints,
    fetchBlueprintEffect,
    setsLoadedEffect,
  }
}
export default CardCatalog
