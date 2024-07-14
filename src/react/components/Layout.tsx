import styled, { css } from 'styled-components'
import { desktopAndUp, tabPortAndUp } from '../styles/Responsive'

const layout = css`
  width: 100%;
  height: 100%;
  padding-left: 1.9rem;
  padding-right: 1.9rem;

  ${tabPortAndUp(css`
    padding-left: 3rem;
    padding-right: 3rem;
  `)}

  ${desktopAndUp(css`
    max-width: 125.4rem;
    margin: auto;
  `)}
`

export const SectionLayout = styled.section`
  ${layout}
`

export const PageLayout = styled.div`
  ${layout}
`

export const CenterContent = styled.div`
  margin-top: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`
