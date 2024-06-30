import React from 'react'
import { CardBlueprintDto } from '../../../../core/types/CardBlueprintDto'
import { addMyCard } from '../../../network/myCardClient'
import { MyCardDto } from '../../../../core/types/MyCardDto'
import { MyCardConditionType } from '../../../../core/types/MyCardCondition'
import CardButton, { useWithCardButton } from './CardButton'

type AddCardButtonProps = {
  blueprint: CardBlueprintDto
  condition: MyCardConditionType
  refreshBlueprints: () => void
}

const AddCardButton = ({
  blueprint,
  condition,
  refreshBlueprints,
}: AddCardButtonProps) => {
  const cardButton = useInAddCardButton(blueprint, condition, refreshBlueprints)
  return <CardButton {...cardButton} />
}

export const useInAddCardButton = (
  blueprint: CardBlueprintDto,
  condition: MyCardConditionType,
  refreshBlueprints: () => void
) => {
  const addCard = () => {
    const dto: MyCardDto = {
      cardTraderBlueprintId: blueprint.cardTraderBlueprintId,
      cardTraderExpansionId: blueprint.cardTraderExpansionId,
      name: blueprint.name,
      condition: condition.id,
    }

    return addMyCard(dto)
  }

  const cardButton = useWithCardButton(addCard, refreshBlueprints)
  return { ...cardButton, title: 'Add' }
}

export default AddCardButton
