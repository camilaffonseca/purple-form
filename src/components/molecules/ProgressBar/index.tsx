import { useMemo } from 'react'

import { Box } from 'components/atoms/Box'
import { QuestionBreadcrumb } from 'components/molecules/QuestionBreadcrumb'

import { QuestionStatus } from 'constants/questionStatus'

import { AnimatedBox } from './style'

type ProgressBarProps = {
  questionsAmount: number
  completedAmount: number
}

const ProgressBar = ({ questionsAmount, completedAmount }: ProgressBarProps) => {
  const proportion =
    questionsAmount === completedAmount
      ? 100
      : (100 / (questionsAmount - 1)) * completedAmount

  const questionBreadcrumbs = useMemo(() => {
    const getStatus = (i: number) => {
      if (i < completedAmount) {
        return QuestionStatus.COMPLETE
      }

      if (i === completedAmount) {
        return QuestionStatus.ACTIVE
      }

      return QuestionStatus.PENDING
    }

    return [...Array(questionsAmount)].map((_, i) => {
      // did not have a major impact on the reconciliation algorithm in this case
      // eslint-disable-next-line react/no-array-index-key
      return <QuestionBreadcrumb key={i} status={getStatus(i)} questionOrder={i + 1} />
    })
  }, [completedAmount, questionsAmount])

  return (
    <Box display='unset' h='12px' w='100%' bg='neutral500'>
      <AnimatedBox
        w={`${proportion}%`}
        backgroundImage='gradient-to-r'
        gradientFrom='secondary'
        gradientTo='primary'
      />
      <Box
        w='100%'
        flexDirection='row'
        justifyContent='space-between'
        position='relative'
        mt='-22px'
      >
        {questionBreadcrumbs}
      </Box>
    </Box>
  )
}

export { ProgressBar }
