import styled from 'styled-components'
import { fetchSet } from '../../network/setsClient'
import SetSearchBar, { useWithSetSearchBar } from './SetSearchBar'
import React, { useEffect, useState } from 'react'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { UseEffectType } from '../../types/UseEffectType'
import CardCatalogItem from './CardCatalogItem'

const Container = styled.div`
  margin-top: 3rem;
`

const CardCatalog = () => {
  const { setSearchBarBind, blueprints, fetchBlueprintEffect } =
    useInCardCatalog()

  useEffect(fetchBlueprintEffect.effect, fetchBlueprintEffect.deps)

  return (
    <Container>
      <p>Search Pokemon Cards by set</p>
      <SetSearchBar {...setSearchBarBind} />
      {blueprints?.map((blueprint) => (
        <CardCatalogItem key={blueprint.cardTraderId} blueprint={blueprint} />
      ))}
    </Container>
  )
}

export const useInCardCatalog = () => {
  const { bind: setSearchBarBind, selectedSet } = useWithSetSearchBar()
  const [blueprints, setBlueprints] = useState<CardBlueprintDto[] | null>(null)

  const fetchBlueprintEffect: UseEffectType = {
    effect: () => {
      if (selectedSet) {
        fetchSet(selectedSet.id)
          .then((res) => setBlueprints(res.data))
          .catch((err) => console.log(err))
      }
    },
    deps: [selectedSet],
  }

  return { setSearchBarBind, blueprints, fetchBlueprintEffect }
}
export default CardCatalog
