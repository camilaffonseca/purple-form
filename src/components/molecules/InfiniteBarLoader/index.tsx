import { PropsWithChildren } from 'react'

import styled, { css } from '@xstyled/styled-components'

type InfiniteBarLoaderProps = { isVisible: boolean }

const InfiniteBarLoaderContainer = styled.div<PropsWithChildren<InfiniteBarLoaderProps>>`
  position: relative;
  height: 4px;
  display: block;
  width: 100%;
  background-color: neutral100;
  border-radius: 2px;
  margin: 0.5rem 0 1rem 0;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.4s ease;

  ${({ isVisible }) =>
    !isVisible &&
    css`
      opacity: 0;
    `}
`

const Bar = styled.div`
  background-color: primary;

  &:before {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  &:after {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
      infinite;
    animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    -webkit-animation-delay: 1.15s;
    animation-delay: 1.15s;
  }

  @-webkit-keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  @-webkit-keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }

  @keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }
`

const InfiniteBarLoader = ({ isVisible }: InfiniteBarLoaderProps) => (
  <InfiniteBarLoaderContainer isVisible={isVisible}>
    <Bar />
  </InfiniteBarLoaderContainer>
)

export { InfiniteBarLoader }
