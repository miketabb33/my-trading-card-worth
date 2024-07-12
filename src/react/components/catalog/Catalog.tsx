import styled from 'styled-components'
import { fetchSet } from '../../network/setsClient'
import Autocomplete, { useWithAutocomplete } from '../base/form/Autocomplete'
import React, { useEffect, useState } from 'react'
import { SetDto } from '../../../core/types/CardBlueprintDto'
import { UseEffectType } from '../../types/UseEffectType'
import { CardSetDto } from '../../../core/types/CardSetDto'
import { DropdownOption } from '../base/form/utilities/InputFieldDropdown'
import CatalogExpansionDetails from './CatalogExpansionDetails'
import { useRouter } from '../../router/useRouter'
import { useExpansion } from '../../providers/ExpansionProvider'
import { PATH_VALUES } from '../../router/pathValues'
import CardList from '../card-list/CardList'
import { CardDto } from '../../../core/types/CardDto'

const Container = styled.div`
  margin-top: 1rem;
`

const CardsHeader = styled.h1`
  margin-top: 2rem;
`

const Catalog = () => {
  const {
    autocompleteBind,
    cardsDto,
    expansionDetailsDto,
    setsLoadedEffect,
    fetchExpansionDetailsAndCardsEffect,
    refreshCards,
  } = useInCatalog()

  useEffect(setsLoadedEffect.effect, setsLoadedEffect.deps)
  useEffect(
    fetchExpansionDetailsAndCardsEffect.effect,
    fetchExpansionDetailsAndCardsEffect.deps
  )

  return (
    <Container>
      <p>Search Pokemon Cards by set</p>
      <Autocomplete {...autocompleteBind} />
      {expansionDetailsDto && (
        <CatalogExpansionDetails details={expansionDetailsDto} />
      )}
      {cardsDto.length > 0 && <CardsHeader>Cards:</CardsHeader>}
      <CardList cardsDto={cardsDto} refreshCards={refreshCards} />
    </Container>
  )
}

export const useInCatalog = () => {
  const { expansions } = useExpansion()
  const { getParam, navigateTo } = useRouter()
  const expansionSlug = getParam('expansionSlug')
  const [selectedSet, setSelectedSet] = useState<SetDto | null>(null)
  const [filteredCardsDto, setFilteredCardsDto] = useState<CardDto[]>([])

  const fetchExpansionDetailsAndCards = () => {
    if (!expansionSlug) return
    const selectedExpansion = expansions?.find(
      (expansion) => expansion.slug === expansionSlug
    )
    if (!selectedExpansion) return
    fetchSet(selectedExpansion.cardTraderExpansionId)
      .then((res) => {
        setSelectedSet(res.data)
        setFilteredCardsDto(
          res.data?.blueprints.sort(sortByHighestMedian) ?? []
        )
      })
      .catch((err) => console.log(err))
  }

  const sortByHighestMedian = (a: CardDto, b: CardDto) => {
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

  const fetchExpansionDetailsAndCardsEffect: UseEffectType = {
    effect: fetchExpansionDetailsAndCards,
    deps: [expansionSlug, expansions],
  }

  return {
    autocompleteBind,
    cardsDto: filteredCardsDto,
    expansionDetailsDto: selectedSet?.details || null,
    setsLoadedEffect,
    fetchExpansionDetailsAndCardsEffect,
    refreshCards: fetchExpansionDetailsAndCards,
  }
}
export default Catalog
