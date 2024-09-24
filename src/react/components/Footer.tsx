import React from 'react'
import styled, { css } from 'styled-components'
import { ResponsiveLayout } from './base/layout/ResponsiveLayout'
import ExternalTextLink from './base/text-link/ExternalTextLink'
import InternalTextLink from './base/text-link/InternalTextLink'
import { PATH_VALUES } from '../router/pathValues'
import { tabLandAndUp } from '../styles/Responsive'

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.staticColor.gray_50};
`

const Content = styled(ResponsiveLayout)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  font-size: 1.1rem;

  ${tabLandAndUp(css`
    font-size: 1.3rem;
  `)}
`

const Footer = () => {
  return (
    <Container>
      <Content>
        <div>
          Created By <ExternalTextLink href="https://michael-tabb.com/">Michael Tabb</ExternalTextLink>
        </div>

        <div>
          <InternalTextLink pathValue={PATH_VALUES.developerNotes} label="Developer Notes" />
        </div>

        <div>
          <ExternalTextLink href="https://www.termsfeed.com/live/d4f4a987-fd96-436a-9fbb-42f7577536cc">
            Privacy Policy
          </ExternalTextLink>
        </div>

        <div>
          Support by <ExternalTextLink href="https://buymeacoffee.com/michaeltabb">Donating</ExternalTextLink>
        </div>
      </Content>
    </Container>
  )
}

export default Footer
