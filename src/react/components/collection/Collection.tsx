import React from 'react'
import CardList from '../card-list/CardList'
import { useMyCards } from '../../network/myCardClient'

const Collection = () => {
  const { myCards, refresh } = useInCollection()
  return <CardList blueprints={myCards} refreshBlueprints={refresh} />
}

export const useInCollection = () => {
  const { data: myCards, refresh } = useMyCards()
  return {
    myCards: myCards || [],
    refresh,
  }
}

export default Collection
