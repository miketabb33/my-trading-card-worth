import React from 'react'
import { removeMyCard } from '../../../network/myCardClient'

import CardButton, { useWithCardButton } from './CardButton'

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

  return <CardButton {...cardButton} />
}

export const useInRemoveCardButton = (
  blueprintId: number,
  cardsOwned: number,
  refreshBlueprints: () => void
) => {
  const removeCard = () => {
    return removeMyCard(blueprintId)
  }

  const cardButton = useWithCardButton(removeCard, refreshBlueprints)

  const isDisabled = cardsOwned <= 0 ? true : cardButton.isDisabled
  return { ...cardButton, title: 'Remove', isDisabled }
}

export default RemoveCardButton
