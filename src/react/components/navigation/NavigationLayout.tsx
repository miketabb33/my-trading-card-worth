import styled, { css } from 'styled-components'
import { tabLandAndUp } from '../../styles/Responsive'
import React, { ReactNode } from 'react'

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 0.5rem;

  ${tabLandAndUp(css`
    height: 6rem;
    grid-template-columns: repeat(3, 1fr);
  `)}
`

const OptionsPosition = styled.div`
  align-items: center;
  height: 100%;

  ${tabLandAndUp(css`
    grid-column: 2/3;
    justify-self: center;
  `)}
`

const UserControlsPosition = styled.div`
  justify-self: end;
  align-items: center;

  ${tabLandAndUp(css`
    grid-column: 3/4;
  `)}
`

const StoreStatusPosition = styled.div`
  grid-column: 1 / 3;
  grid-row: 2/3;

  ${tabLandAndUp(css`
    grid-column: 1/2;
    grid-row: initial;
  `)}
`

type NavigationLayoutProps = {
  options: ReactNode
  userControls: ReactNode
  storeStatus: ReactNode
}

const NavigationLayout = ({
  options,
  userControls,
  storeStatus,
}: NavigationLayoutProps) => {
  return (
    <Container>
      <StoreStatusPosition>{storeStatus}</StoreStatusPosition>
      <OptionsPosition>{options}</OptionsPosition>
      <UserControlsPosition>{userControls}</UserControlsPosition>
    </Container>
  )
}

export default NavigationLayout
