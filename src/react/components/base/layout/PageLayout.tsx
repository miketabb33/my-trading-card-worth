import React from 'react'
import { ChildrenProp } from '../../../types/ChildrenProp'
import styled from 'styled-components'
import Navigation from '../../navigation/Navigation'
import Footer from '../../Footer'
import { ResponsiveLayout } from './ResponsiveLayout'

const FOOTER_HEIGHT = '2rem'

const Content = styled(ResponsiveLayout)`
  margin-bottom: ${FOOTER_HEIGHT};
`

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${FOOTER_HEIGHT};
`

const PageLayout = ({ children }: ChildrenProp) => {
  return (
    <>
      <Content>
        <Navigation />
        {children}
      </Content>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  )
}

export default PageLayout
