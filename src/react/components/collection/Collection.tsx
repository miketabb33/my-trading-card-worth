import React from 'react'
import CardList, { CardListProps } from '../card-list/CardList'
import { useMyCards } from '../../network/collectionClient'
import CollectionDetails from './CollectionDetails'
import { useProfile } from '../../providers/ProfileProvider'
import CollectionNotLoggedIn from './CollectionNotLoggedIn'
import CollectionNoItems from './CollectionNoItems'
import Spinner from '../base/Spinner'
import { CenterContent } from '../base/layout/CenterContent'
import { CardDto } from '../../../core/types/CardDto'

const Collection = () => {
  const {
    details,
    cardListProps,
    showNotLoggedIn,
    showNoItems,
    showLoading,
    showDetails,
  } = useInCollection()

  return (
    <>
      {showDetails && details && <CollectionDetails details={details} />}
      <CardList {...cardListProps} />

      {showNotLoggedIn && (
        <CenterContent>
          <CollectionNotLoggedIn />
        </CenterContent>
      )}

      {showNoItems && (
        <CenterContent>
          <CollectionNoItems />
        </CenterContent>
      )}

      {showLoading && (
        <CenterContent>
          <Spinner />
        </CenterContent>
      )}
    </>
  )
}

export const useInCollection = () => {
  const { isLoggedIn, isLoading: isLoadingProfile } = useProfile()

  const {
    data: collectionDto,
    refresh,
    isLoading: isLoadingCollection,
  } = useMyCards(isLoggedIn)

  const cardsDto = collectionDto?.cards || []
  const detailsDto = collectionDto?.details

  const sortByHighestMedian = (a: CardDto, b: CardDto) => {
    return b.medianMarketValueCents - a.medianMarketValueCents
  }

  const cardListProps: CardListProps = {
    cardsDto: cardsDto.sort(sortByHighestMedian),
    refreshCards: refresh,
  }

  const isLoading = isLoadingProfile || isLoadingCollection
  const showNoItems = !isLoading && cardsDto.length === 0 && isLoggedIn

  return {
    cardListProps,
    details: detailsDto,
    showNotLoggedIn: !isLoading && !isLoggedIn,
    showNoItems,
    showDetails: !showNoItems && !!detailsDto,
    showLoading: isLoading && cardsDto.length === 0,
  }
}

export default Collection
