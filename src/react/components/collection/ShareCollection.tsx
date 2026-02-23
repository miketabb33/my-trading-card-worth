import React from 'react'
import CardList from '../card-list/CardList'
import { useShareCollection } from '../../network/collectionClient'
import { useRouter } from '../../router/useRouter'
import CollectionDetails from './CollectionDetails'
import { CenterContent } from '../base/layout/CenterContent'
import Spinner from '../base/Spinner'
import ShareCollectionNotFound from './ShareCollectionNotFound'
import { CardDto } from '@core/network-types/card'
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
  const { cards, meta, name, showUserFoundView, showNoUserFoundView, showLoading, showEditLink } =
    useInShareCollection()
  return (
    <>
      {showUserFoundView && (
        <>
          {meta && <CollectionDetails collectionMeta={meta} nameTag={`${name}'s`} />}

          {showEditLink && (
            <Links>
              <InternalTextLink pathValue={PATH_VALUES.collection()} label="Edit Your Collection" />
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
    meta: collection?.meta,
    name: collection?.name,
    showUserFoundView: collectionFound && !isLoading,
    showNoUserFoundView: !collectionFound && !isLoading,
    showLoading: isLoading,
    showEditLink: Number(userId) === profile?.id,
  }
}

export default ShareCollection
