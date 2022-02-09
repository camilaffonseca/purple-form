import Image from 'next/image'

import { Text } from 'components/atoms/Text'

import { QuestionStatus } from 'constants/questionStatus'

import { Background } from './style'
import { StatusType } from './types'

type QuestionBreadcrumbProps = {
  questionOrder: number
} & StatusType

const QuestionBreadcrumb = ({ questionOrder, status }: QuestionBreadcrumbProps) => (
  <Background status={status}>
    {status === QuestionStatus.COMPLETE ? (
      <Image
        src='/icons/complete.svg'
        width='20px'
        height='20px'
        alt='Ícone sinalizando que a questão já foi concluída'
      />
    ) : (
      <Text color='white' fontSize='2xl' lineHeight='1' fontWeight='bold'>
        {questionOrder}
      </Text>
    )}
  </Background>
)

export { QuestionBreadcrumb }
