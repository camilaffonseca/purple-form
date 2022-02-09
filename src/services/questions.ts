import { api } from 'services/api'

import { Question } from 'types/question'

type FetchType = {
  questions: Question[]
}

type AnswerType = {
  options: { id: number; text?: string }[]
}

export const getQuestions = (userId: number | string) => {
  return api
    .get<FetchType>(`/list-questions/${process.env.NEXT_PUBLIC_ID}/${userId}`)
    .then(response => response.data)
}

export const postAnswer = (userId: number | string, data: AnswerType) => {
  return api.post(`/save-answers/${process.env.NEXT_PUBLIC_ID}/${userId}`, data)
}
