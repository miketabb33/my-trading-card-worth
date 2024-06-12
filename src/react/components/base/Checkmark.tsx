import React from 'react'
import styled from 'styled-components'

const CheckmarkSvg = styled.svg`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation:
    fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;

  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #7ac142;
    }
  }
`

const Circle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
`

const Path = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
`

const Checkmark = () => {
  return (
    <CheckmarkSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <Circle cx="26" cy="26" r="25" fill="none" />
      <Path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </CheckmarkSvg>
  )
}

export default Checkmark
