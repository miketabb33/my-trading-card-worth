import React, { useEffect, useState } from 'react'
import SetSearchBar, { useWithSetSearchBar } from './components/SetSearchBar'
import { PageLayout } from './components/Layout'
import styled from 'styled-components'
import { CardBlueprintDto } from '../core/types/CardBlueprintDto'
import { fetchSet } from './network/setsClient'
import { UseEffectType } from './types/UseEffectType'

const Item = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`

const Image = styled.img``

const Spacer = styled.div`
  height: 2rem;
`

const Home = () => {
  const { setSearchBarBind, blueprints, fetchBlueprintEffect } = useInHome()
  useEffect(fetchBlueprintEffect.effect, fetchBlueprintEffect.deps)
  return (
    <PageLayout>
      <Spacer />
      <p>Search Pokemon Cards by set</p>
      <SetSearchBar {...setSearchBarBind} />
      {blueprints?.map((blueprint) => {
        return (
          <Item key={blueprint.cardTraderId}>
            <Image src={blueprint.imageUrl} />
            <p>{blueprint.name}</p>
            <p>{blueprint.version}</p>
          </Item>
        )
      })}
    </PageLayout>
  )
}

const useInHome = () => {
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

export default Home
