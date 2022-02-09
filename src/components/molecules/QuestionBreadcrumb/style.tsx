import { PropsWithChildren } from 'react'

import styled, { css } from '@xstyled/styled-components'

import { Box } from 'components/atoms/Box'

import { QuestionStatus } from 'constants/questionStatus'

import { StatusType } from './types'

const getStyle = (status: string) => {
  switch (status) {
    case QuestionStatus.COMPLETE:
      return css`
        background-color: primary;
        border-color: white;
      `
    case QuestionStatus.ACTIVE:
      return css`
        background-color: neutral200;
        border-color: primary;
      `
    case QuestionStatus.PENDING:
      return css`
        background-color: neutral200;
        border-color: neutral100;
      `

    default:
      return ''
  }
}

export const Background = styled(Box)<PropsWithChildren<StatusType>>`
  width: 32;
  height: 32;
  border-radius: 50%;
  border-width: 3;
  align-items: center;
  justify-content: center;
  margin-left: ${({ ml }) => ml};

  ${({ status }) => getStyle(status)}
`
