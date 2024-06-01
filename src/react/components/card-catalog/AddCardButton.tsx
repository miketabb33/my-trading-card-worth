import React, { useEffect, useState } from 'react'
import { Button } from '../base/Button'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { addMyCard } from '../../network/myCardClient'
import { MyCardDto } from '../../../core/types/MyCardDto'
import { MyCardCondition } from '../../../core/types/MyCardCondition'
import { Loader } from './Loader'
import Checkmark from './Checkmark'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

type AddCardButtonProps = {
  blueprint: CardBlueprintDto
}

const AddCardButton = ({ blueprint }: AddCardButtonProps) => {
  const { click, isLoading, showCheckmark, isDisabled } =
    useInAddCardButton(blueprint)

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

export const useInAddCardButton = (blueprint: CardBlueprintDto) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)

  useEffect(() => {
    if (showCheckmark) {
      setTimeout(() => setShowCheckmark(false), 2000)
    }
  }, [showCheckmark])

  const click = () => {
    const dto: MyCardDto = {
      cardTraderId: blueprint.cardTraderId,
      name: blueprint.name,
      condition: MyCardCondition.NearMint,
    }
    setIsLoading(true)
    addMyCard(dto)
      .then(() => setShowCheckmark(true))
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
