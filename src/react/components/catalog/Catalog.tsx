import styled from 'styled-components'
import { fetchCatalog } from '../../network/catalogClient'
import Autocomplete, { useWithAutocomplete } from '../base/form/Autocomplete'
import React, { useEffect, useState } from 'react'
import { CatalogDto } from '../../../core/types/CatalogDto'
import { UseEffectType } from '../../types/UseEffectType'
import { ExpansionDto } from '../../../core/types/ExpansionDto'
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
    expansionsLoadedEffect,
    fetchExpansionDetailsAndCardsEffect,
    refreshCards,
  } = useInCatalog()

  useEffect(expansionsLoadedEffect.effect, expansionsLoadedEffect.deps)
  useEffect(
    fetchExpansionDetailsAndCardsEffect.effect,
    fetchExpansionDetailsAndCardsEffect.deps
  )

  return (
    <Container>
      <p>Search Pokemon Cards By Expansion</p>
      <Autocomplete {...autocompleteBind} />
      {expansionDetailsDto && (
        <CatalogExpansionDetails expansionDetailsDto={expansionDetailsDto} />
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
  const [selectedExpansion, setSelectedExpansion] = useState<CatalogDto | null>(
    null
  )
  const [filteredCardsDto, setFilteredCardsDto] = useState<CardDto[]>([])

  const fetchExpansionDetailsAndCards = () => {
    if (!expansionSlug) return
    const selectedExpansion = expansions?.find(
      (expansion) => expansion.slug === expansionSlug
    )
    if (!selectedExpansion) return
    fetchCatalog(selectedExpansion.expansionId)
      .then((res) => {
        setSelectedExpansion(res.data)
        setFilteredCardsDto(res.data?.cards.sort(sortByHighestMedian) ?? [])
      })
      .catch((err) => console.log(err))
  }

  const sortByHighestMedian = (a: CardDto, b: CardDto) => {
    return b.medianMarketValueCents - a.medianMarketValueCents
  }

  const { bind: autocompleteBind, setOptions } =
    useWithAutocomplete<ExpansionDto>({
      didSelectOption: (option) => navigateTo(PATH_VALUES.catalog(option.slug)),
    })

  const expansionsLoadedEffect: UseEffectType = {
    effect: () => {
      if (expansions) {
        const newOptions: DropdownOption<ExpansionDto>[] = expansions.map(
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
    expansionDetailsDto: selectedExpansion?.details || null,
    expansionsLoadedEffect,
    fetchExpansionDetailsAndCardsEffect,
    refreshCards: fetchExpansionDetailsAndCards,
  }
}
export default Catalog
