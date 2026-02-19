import styled, { css } from 'styled-components'
import { tabLandAndUp } from '../../styles/Responsive'
import { ResponsiveLayout } from '../base/layout/ResponsiveLayout'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PATH_VALUES } from '../../router/pathValues'

const Bar = styled.div`
  background-color: ${({ theme }) => theme.staticColor.gray_900};
  border-bottom: 1px solid ${({ theme }) => theme.staticColor.gold_400};
`

const Container = styled(ResponsiveLayout)`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  row-gap: 0;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;

  ${tabLandAndUp(css`
    height: 6rem;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    padding-top: 0;
    padding-bottom: 0;
  `)}
`

const BrandColumn = styled.div`
  display: flex;
  align-items: center;

  ${tabLandAndUp(css`
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  `)}
`

const Wordmark = styled(Link)`
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.staticColor.gray_50};
  letter-spacing: 0.05em;
  white-space: nowrap;
  text-decoration: none;

  ${tabLandAndUp(css`
    font-size: 2.8rem;
  `)}
`

const Accent = styled.span`
  color: ${({ theme }) => theme.staticColor.gold_400};
`

const OptionsPosition = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  height: 4rem;
  margin-top: 0.4rem;

  ${tabLandAndUp(css`
    grid-column: 2;
    grid-row: 1;
    justify-self: center;
    margin-top: 0;
    height: 100%;
  `)}
`

const UserControlsPosition = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;

  ${tabLandAndUp(css`
    grid-column: 3;
    grid-row: 1;
  `)}
`

const StoreStatusWrap = styled.div`
  display: none;

  ${tabLandAndUp(css`
    display: block;
  `)}
`

type NavigationLayoutProps = {
  options: ReactNode
  userControls: ReactNode
  storeStatus: ReactNode
}

const NavigationLayout = ({ options, userControls, storeStatus }: NavigationLayoutProps) => {
  return (
    <Bar>
      <Container>
        <BrandColumn>
          <Wordmark to={PATH_VALUES.home}>
            TCG<Accent>VALOR</Accent>
          </Wordmark>
          <StoreStatusWrap>{storeStatus}</StoreStatusWrap>
        </BrandColumn>
        <UserControlsPosition>{userControls}</UserControlsPosition>
        <OptionsPosition>{options}</OptionsPosition>
      </Container>
    </Bar>
  )
}

export default NavigationLayout
