import React from 'react'
import { removeMyCard } from '../../../network/collectionClient'

import CardButtonBase, { useWithCardButtonBase } from './CardButton'

type RemoveCardButtonProps = {
  blueprintId: number
  cardsOwned: number
  refreshCards: () => void
}

const RemoveCardButton = ({
  blueprintId,
  cardsOwned,
  refreshCards,
}: RemoveCardButtonProps) => {
  const cardButton = useInRemoveCardButton(
    blueprintId,
    cardsOwned,
    refreshCards
  )

  return <CardButtonBase {...cardButton} />
}

export const useInRemoveCardButton = (
  blueprintId: number,
  cardsOwned: number,
  refreshCards: () => void
) => {
  const removeCard = () => {
    return removeMyCard(blueprintId)
  }

  const cardButtonBase = useWithCardButtonBase(removeCard, refreshCards)

  const isDisabled = cardsOwned <= 0 ? true : cardButtonBase.isDisabled
  return { ...cardButtonBase, title: 'Remove', isDisabled }
}

export default RemoveCardButton
