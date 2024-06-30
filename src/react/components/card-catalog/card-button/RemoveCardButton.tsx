import React from 'react'
import { removeMyCard } from '../../../network/myCardClient'

import CardButton, { useWithCardButton } from './CardButton'

type RemoveCardButtonProps = {
  refreshBlueprints: () => void
}

const RemoveCardButton = ({ refreshBlueprints }: RemoveCardButtonProps) => {
  const cardButton = useInRemoveCardButton(refreshBlueprints)

  return <CardButton {...cardButton} />
}

export const useInRemoveCardButton = (refreshBlueprints: () => void) => {
  const cardButton = useWithCardButton(removeMyCard, refreshBlueprints)
  return { ...cardButton, title: 'Remove' }
}

export default RemoveCardButton
