import styled, { css } from 'styled-components'
import { tabLandAndUp } from '../../styles/Responsive'
import React, { ReactNode } from 'react'

const Container = styled.div`
  display: grid;
  align-items: center;
  height: 6rem;

  grid-template-columns: repeat(2, 1fr);

  ${tabLandAndUp(css`
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

type NavigationLayoutProps = {
  options: ReactNode
  userControls: ReactNode
}

const NavigationLayout = ({ options, userControls }: NavigationLayoutProps) => {
  return (
    <Container>
      <OptionsPosition>{options}</OptionsPosition>

      <UserControlsPosition>{userControls}</UserControlsPosition>
    </Container>
  )
}

export default NavigationLayout
