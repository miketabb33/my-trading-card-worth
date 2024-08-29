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
import InternalTextLink from '../base/text-link/InternalTextLink'
import { PATH_VALUES } from '../../router/pathValues'
import styled from 'styled-components'

const Links = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 3rem;
`

const Collection = () => {
  const {
    meta,
    cardListProps,
    shareLinkPath,
    showCollection,
    showNotLoggedIn,
    showNoCollection,
    showLoading,
    copyShareLinkToClipboard,
  } = useInCollection()

  return (
    <>
      {showCollection && (
        <>
          {meta && <CollectionDetails collectionMeta={meta} />}
          <Links>
            <InternalTextLink
              pathValue={shareLinkPath}
              label="View Share Page"
            />
            <InternalTextLink
              onClick={() => void copyShareLinkToClipboard()}
              label="Copy Share Link"
            />
          </Links>
          <CardList {...cardListProps} />
        </>
      )}

      {showNotLoggedIn && (
        <CenterContent>
          <CollectionNotLoggedIn />
        </CenterContent>
      )}

      {showNoCollection && (
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
  const { isLoggedIn, isLoading: isLoadingProfile, profile } = useProfile()

  const {
    data: collectionDto,
    refresh,
    isLoading: isLoadingCollection,
  } = useMyCards(isLoggedIn)

  const cardsDto = collectionDto?.cards || []

  const sortByHighestMedian = (a: CardDto, b: CardDto) => {
    return b.medianMarketValueCents - a.medianMarketValueCents
  }

  const cardListProps: CardListProps = {
    cardsDto: cardsDto.sort(sortByHighestMedian),
    refreshCards: refresh,
  }

  const shareLinkPath = PATH_VALUES.collection(profile?.userId)

  const copyShareLinkToClipboard = async () => {
    await navigator.clipboard.writeText(`${location.origin}${shareLinkPath}`)
  }

  const isLoading = isLoadingProfile || isLoadingCollection

  return {
    cardListProps,
    meta: collectionDto?.meta,
    shareLinkPath,
    showNotLoggedIn: !isLoading && !isLoggedIn,
    showNoCollection: !isLoading && cardsDto.length === 0 && isLoggedIn,
    showCollection: !isLoading && cardsDto.length > 0 && isLoggedIn,
    showLoading: isLoading && cardsDto.length === 0,
    copyShareLinkToClipboard,
  }
}

export default Collection
