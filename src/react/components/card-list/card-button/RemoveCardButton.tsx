import React from 'react'
import { removeMyCard } from '../../../network/myCardClient'

import CardButtonBase, { useWithCardButtonBase } from './CardButton'

type RemoveCardButtonProps = {
  blueprintId: number
  cardsOwned: number
  refreshBlueprints: () => void
}

const RemoveCardButton = ({
  blueprintId,
  cardsOwned,
  refreshBlueprints,
}: RemoveCardButtonProps) => {
  const cardButton = useInRemoveCardButton(
    blueprintId,
    cardsOwned,
    refreshBlueprints
  )

  return <CardButtonBase {...cardButton} />
}

export const useInRemoveCardButton = (
  blueprintId: number,
  cardsOwned: number,
  refreshBlueprints: () => void
) => {
  const removeCard = () => {
    return removeMyCard(blueprintId)
  }

  const cardButtonBase = useWithCardButtonBase(removeCard, refreshBlueprints)

  const isDisabled = cardsOwned <= 0 ? true : cardButtonBase.isDisabled
  return { ...cardButtonBase, title: 'Remove', isDisabled }
}

export default RemoveCardButton
