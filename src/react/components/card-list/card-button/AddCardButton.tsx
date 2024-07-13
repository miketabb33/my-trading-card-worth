import React from 'react'
import { addMyCard } from '../../../network/collectionClient'
import { AddMyCardDto } from '../../../../core/types/AddMyCardDto'
import { CardCondition } from '../../../../core/types/CardCondition'
import CardButtonBase, { useWithCardButtonBase } from './CardButton'
import { CardDto } from '../../../../core/types/CardDto'

type AddCardButtonProps = {
  cardDto: CardDto
  condition: CardCondition
  refreshCards: () => void
}

const AddCardButton = ({
  cardDto,
  condition,
  refreshCards: refreshCards,
}: AddCardButtonProps) => {
  const cardButton = useInAddCardButton(cardDto, condition, refreshCards)
  return <CardButtonBase {...cardButton} />
}

export const useInAddCardButton = (
  cardDto: CardDto,
  condition: CardCondition,
  refreshCards: () => void
) => {
  const addCard = () => {
    const dto: AddMyCardDto = {
      blueprintId: cardDto.blueprintId,
      expansionId: cardDto.expansionId,
      name: cardDto.name,
      condition: condition.id,
      imageUrlPreview: cardDto.imageUrlPreview,
      imageUrlShow: cardDto.imageUrlShow,
    }

    return addMyCard(dto)
  }

  const cardButtonBase = useWithCardButtonBase(addCard, refreshCards)
  return { ...cardButtonBase, title: 'Add' }
}

export default AddCardButton
