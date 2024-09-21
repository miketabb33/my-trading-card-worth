import { FlattenSimpleInterpolation, css } from 'styled-components'

export const tabPortAndUp = (styles: FlattenSimpleInterpolation) =>
  // 600px
  css`
    @media only screen and (min-width: 37.5em) {
      ${styles}
    }
  `

export const tabLandAndUp = (styles: FlattenSimpleInterpolation) =>
  // 900px
  css`
    @media only screen and (min-width: 56.25em) {
      ${styles}
    }
  `

export const desktopAndUp = (styles: FlattenSimpleInterpolation) =>
  // 1200px
  css`
    @media only screen and (min-width: 75em) {
      ${styles}
    }
  `

export const bigDesktop = (styles: FlattenSimpleInterpolation) =>
  // 1800px
  css`
    @media only screen and (min-width: 112.5em) {
      ${styles}
    }
  `

type DeviceClass = 'tablet-portrait' | 'tablet-landscape' | 'desktop' | 'big-desktop'

const deviceClassMap = new Map<DeviceClass, (styles: FlattenSimpleInterpolation) => FlattenSimpleInterpolation>([
  ['tablet-portrait', tabPortAndUp],
  ['tablet-landscape', tabLandAndUp],
  ['desktop', desktopAndUp],
  ['big-desktop', bigDesktop],
])

export const showOnAndUp = (deviceClass: DeviceClass) => {
  const query = deviceClassMap.get(deviceClass) || tabPortAndUp
  return css`
    display: none;
    ${query(css`
      display: block;
    `)}
  `
}

export const hideOnAndUp = (deviceClass: DeviceClass) => {
  const query = deviceClassMap.get(deviceClass) || tabPortAndUp
  return css`
    display: block;
    ${query(css`
      display: none;
    `)}
  `
}
