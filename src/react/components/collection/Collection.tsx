import React from 'react'
import CardList from '../card-list/CardList'
import { useMyCards } from '../../network/collectionClient'

const Collection = () => {
  const { myCards, refresh } = useInCollection()
  return <CardList cardsDto={myCards} refreshCards={refresh} />
}

export const useInCollection = () => {
  const { data: myCards, refresh } = useMyCards()
  return {
    myCards: myCards || [],
    refresh,
  }
}

export default Collection
