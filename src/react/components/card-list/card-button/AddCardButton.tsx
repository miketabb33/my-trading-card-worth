import React from 'react'
import { CardBlueprintDto } from '../../../../core/types/CardBlueprintDto'
import { addMyCard } from '../../../network/myCardClient'
import { MyCardDto } from '../../../../core/types/MyCardDto'
import { MyCardConditionType } from '../../../../core/types/MyCardCondition'
import CardButtonBase, { useWithCardButtonBase } from './CardButton'

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
  return <CardButtonBase {...cardButton} />
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
      imageUrlPreview: blueprint.imageUrlPreview,
      imageUrlShow: blueprint.imageUrlShow,
    }

    return addMyCard(dto)
  }

  const cardButtonBase = useWithCardButtonBase(addCard, refreshBlueprints)
  return { ...cardButtonBase, title: 'Add' }
}

export default AddCardButton
