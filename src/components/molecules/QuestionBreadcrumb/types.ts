import { QuestionStatus } from 'constants/questionStatus'

export type StatusType = {
  status: QuestionStatus.ACTIVE | QuestionStatus.COMPLETE | QuestionStatus.PENDING
}
