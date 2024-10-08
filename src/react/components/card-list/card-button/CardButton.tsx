import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../base/Button'
import { Loader } from '../../base/Loader'
import Checkmark from '../../base/Checkmark'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const IconWell = styled.div`
  width: 3rem;
`

export type CardButtonBaseProps = {
  title: string
  shouldShowLoading: boolean
  shouldShowCheckmark: boolean
  isDisabled: boolean
  click: () => void
}

const CardButtonBase = ({ title, shouldShowLoading, shouldShowCheckmark, isDisabled, click }: CardButtonBaseProps) => {
  return (
    <Container>
      <Button onClick={click} disabled={isDisabled}>
        {title}
      </Button>
      <IconWell>
        {shouldShowLoading && <Loader />}
        {shouldShowCheckmark && <Checkmark />}
      </IconWell>
    </Container>
  )
}

export const useWithCardButtonBase = (action: () => Promise<void>, onComplete: () => void): CardButtonBaseProps => {
  const [isLoading, setIsLoading] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)

  useEffect(() => {
    if (showCheckmark) {
      setTimeout(() => setShowCheckmark(false), 2000)
    }
  }, [showCheckmark])

  const click = () => {
    setIsLoading(true)
    action()
      .then(() => {
        onComplete()
        setShowCheckmark(true)
      })
      .catch(console.dir)
      .finally(() => setIsLoading(false))
  }

  return {
    title: 'Action',
    shouldShowCheckmark: showCheckmark,
    shouldShowLoading: isLoading,
    isDisabled: isLoading || showCheckmark,
    click,
  }
}

export default CardButtonBase
