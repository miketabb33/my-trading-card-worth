import React from 'react'
import CardList from '../card-list/CardList'
import { useShareCollection } from '../../network/collectionClient'
import { useRouter } from '../../router/useRouter'
import CollectionDetails from './CollectionDetails'
import { CenterContent } from '../base/layout/CenterContent'
import Spinner from '../base/Spinner'
import ShareCollectionNotFound from './ShareCollectionNotFound'
import { CardDto } from '../../../core/types/CardDto'
import { PATH_VALUES } from '../../router/pathValues'
import { useProfile } from '../../providers/ProfileProvider'
import InternalTextLink from '../base/text-link/InternalTextLink'
import styled from 'styled-components'

const Links = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 3rem;
`

const ShareCollection = () => {
  const {
    cards,
    details,
    showUserFoundView,
    showNoUserFoundView,
    showLoading,
    showEditLink,
  } = useInShareCollection()
  return (
    <>
      {showUserFoundView && (
        <>
          {details && <CollectionDetails details={details} />}
          {showEditLink && (
            <Links>
              <InternalTextLink
                pathValue={PATH_VALUES.collection()}
                label="Edit Your Collection"
              />
            </Links>
          )}
          <CardList cardsDto={cards} isEditable={false} />
        </>
      )}

      {showNoUserFoundView && (
        <CenterContent>
          <ShareCollectionNotFound />
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

export const useInShareCollection = () => {
  const { profile } = useProfile()
  const { getParam } = useRouter()
  const userId = getParam('userId') || ''
  const { data: collection, isLoading } = useShareCollection(userId)

  const collectionFound = !!collection && collection.cards.length > 0
  const cards = collection?.cards || []

  const sortByHighestMedian = (a: CardDto, b: CardDto) => {
    return b.medianMarketValueCents - a.medianMarketValueCents
  }

  return {
    cards: cards.sort(sortByHighestMedian),
    details: collection?.details,
    showUserFoundView: collectionFound && !isLoading,
    showNoUserFoundView: !collectionFound && !isLoading,
    showLoading: isLoading,
    showEditLink: userId === profile?.userId,
  }
}

export default ShareCollection
