import React from 'react'
import CardList from '../card-list/CardList'
import { useMyCards } from '../../network/collectionClient'
import CollectionDetails from './CollectionDetails'

const Collection = () => {
  const { myCards, details, refresh } = useInCollection()

  return (
    <>
      {details && <CollectionDetails details={details} />}
      <CardList cardsDto={myCards} refreshCards={refresh} />
    </>
  )
}

export const useInCollection = () => {
  const { data: collectionDto, refresh } = useMyCards()
  return {
    myCards: collectionDto?.cards || [],
    details: collectionDto?.details,
    refresh,
  }
}

export default Collection
