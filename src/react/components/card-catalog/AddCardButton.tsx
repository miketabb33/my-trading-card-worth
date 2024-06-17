import React, { useEffect, useState } from 'react'
import { Button } from '../base/Button'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { addMyCard } from '../../network/myCardClient'
import { MyCardDto } from '../../../core/types/MyCardDto'
import { MyCardConditionType } from '../../../core/types/MyCardCondition'
import { Loader } from '../base/Loader'
import Checkmark from '../base/Checkmark'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

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
  const { click, isLoading, showCheckmark, isDisabled } = useInAddCardButton(
    blueprint,
    condition,
    refreshBlueprints
  )

  return (
    <Container>
      <Button onClick={click} disabled={isDisabled}>
        Add Card
      </Button>
      {isLoading && <Loader />}
      {showCheckmark && <Checkmark />}
    </Container>
  )
}

export const useInAddCardButton = (
  blueprint: CardBlueprintDto,
  condition: MyCardConditionType,
  refreshBlueprints: () => void
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)

  useEffect(() => {
    if (showCheckmark) {
      setTimeout(() => setShowCheckmark(false), 2000)
    }
  }, [showCheckmark])

  const click = () => {
    const dto: MyCardDto = {
      cardTraderBlueprintId: blueprint.cardTraderBlueprintId,
      cardTraderExpansionId: blueprint.cardTraderExpansionId,
      name: blueprint.name,
      condition: condition.id,
    }
    setIsLoading(true)
    addMyCard(dto)
      .then(() => {
        refreshBlueprints()
        setShowCheckmark(true)
      })
      .catch(console.dir)
      .finally(() => setIsLoading(false))
  }

  return {
    click,
    isLoading,
    showCheckmark,
    isDisabled: isLoading || showCheckmark,
  }
}

export default AddCardButton
