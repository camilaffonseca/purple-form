import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, SyntheticEvent } from 'react'
import { toast } from 'react-toastify'

import { Box } from 'components/atoms/Box'
import { Button } from 'components/atoms/Button'
import { Form } from 'components/atoms/Form'
import { Text } from 'components/atoms/Text'
import { Textarea } from 'components/atoms/Textarea'
import { InfiniteBarLoader } from 'components/molecules/InfiniteBarLoader'
import { InputRadio } from 'components/molecules/InputRadio'
import { ProgressBar } from 'components/molecules/ProgressBar'

import { getQuestions, postAnswer } from 'services/questions'

import { Question } from 'types/question'

type LastQuestionsData = {
  currentQuestions: Question[]
  userId: string | number
}

type QuestionsPageProps = { questions: Question[]; userId: string | number }

const SearchForm: NextPage<QuestionsPageProps> = ({ questions, userId }) => {
  const [currentQuestions, setCurrentQuestions] = useState(questions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateQuestion = async (event: SyntheticEvent) => {
    event.preventDefault()

    const incrementPage = () => {
      if (currentQuestionIndex === currentQuestions.length - 1) {
        setIsLastQuestion(true)
      }

      setCurrentQuestionIndex(prevState => {
        if (prevState === currentQuestions.length - 1) {
          return prevState
        }

        return prevState + 1
      })
    }

    const target = event.target as typeof event.target & {
      currentQuestionRadio?: { value: string }
      currentQuestionTextarea?: { value: string }
    }

    if (target.currentQuestionRadio) {
      try {
        setIsLoading(true)
        await postAnswer(userId, {
          options: [{ id: Number(target.currentQuestionRadio.value) }],
        })

        incrementPage()
      } catch {
        toast.error('Não foi possível enviar a opção selecionada. Tente novamente!')
      } finally {
        setIsLoading(false)
      }

      return
    }

    if (target.currentQuestionTextarea) {
      try {
        setIsLoading(true)
        await postAnswer(userId, {
          options: [
            {
              text: target.currentQuestionTextarea.value,
              id: currentQuestions[currentQuestionIndex].option_set[0].id,
            },
          ],
        })

        incrementPage()
      } catch {
        toast.error('Não foi possível enviar o seu comentário. Tente novamente!')
      } finally {
        setIsLoading(false)
      }

      incrementPage()
    }
  }

  useEffect(() => {
    const resetCache = () => {
      localStorage.setItem(
        'lastQuestionsData',
        JSON.stringify({
          currentQuestions,
          userId,
        })
      )
    }

    if (currentQuestions.length) {
      const lastQuestionsData = localStorage.getItem('lastQuestionsData')

      if (lastQuestionsData) {
        const paserdLastQuestionsData: LastQuestionsData = JSON.parse(lastQuestionsData)

        if (paserdLastQuestionsData.userId !== String(userId)) {
          localStorage.clear()
          setCurrentQuestionIndex(0)
        }
      }

      resetCache()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    if (currentQuestionIndex !== 0) {
      localStorage.setItem('lastQuestionsIndex', String(currentQuestionIndex))
    }
  }, [currentQuestionIndex])

  useEffect(() => {
    if (isLastQuestion) {
      localStorage.clear()
    }
  }, [isLastQuestion])

  useEffect(() => {
    try {
      const lastQuestionsData = localStorage.getItem('lastQuestionsData')
      const lastQuestionsIndex = localStorage.getItem('lastQuestionsIndex')

      if (lastQuestionsData && lastQuestionsIndex) {
        const paserdLastQuestionsData: LastQuestionsData = JSON.parse(lastQuestionsData)
        const paserdLastQuestionsIndex = Number(JSON.parse(lastQuestionsIndex))

        if (
          paserdLastQuestionsData.userId === String(userId) &&
          paserdLastQuestionsIndex <= paserdLastQuestionsData.currentQuestions.length - 1
        ) {
          setCurrentQuestions(paserdLastQuestionsData.currentQuestions)
          setCurrentQuestionIndex(paserdLastQuestionsIndex)
        }
      }

      // eslint-disable-next-line no-empty
    } catch {}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      h='100vh'
      w='100vw'
      justifyContent={{ _: 'unset', md: 'center' }}
      alignItems='center'
    >
      <Head>
        <title>SearchForm | Purple Metrics</title>
      </Head>
      <Box
        as='main'
        w='100%'
        maxWidth='500px'
        gap={{ _: '50px', md: '60px' }}
        p={{ _: '20px', md: 0 }}
        mt={{ _: '50px', md: 0 }}
      >
        {currentQuestions.length && !isLastQuestion ? (
          <>
            <ProgressBar
              questionsAmount={currentQuestions.length}
              completedAmount={currentQuestionIndex}
            />
            <Form
              bg='neutral300'
              p='20px'
              borderRadius='10px'
              gap='20px'
              onSubmit={handleUpdateQuestion}
            >
              <InfiniteBarLoader isVisible={isLoading} />

              <Box gap='30px'>
                <Text fontSize='2xl'>{currentQuestions[currentQuestionIndex].text}</Text>

                {currentQuestions[currentQuestionIndex].option_set[0].option_type ===
                'OPEN_TEXT' ? (
                  <Textarea
                    name='currentQuestionTextarea'
                    spellCheck
                    autoCapitalize='sentences'
                    rows={4}
                    cols={59}
                    disabled={isLoading}
                  />
                ) : (
                  <>
                    {currentQuestions[currentQuestionIndex].option_set.map(option => (
                      <InputRadio
                        required
                        key={option.id}
                        value={option.id}
                        name='currentQuestionRadio'
                        label={option.text}
                        optionId={option.id}
                        disabled={isLoading}
                      />
                    ))}
                  </>
                )}
              </Box>
              <Box w='100%' flexDirection='row' justifyContent='flex-end'>
                <Button
                  w={62}
                  type='submit'
                  mt='12px'
                  aria-label='Botão que leva para a próxima questão'
                >
                  <Image
                    src='/icons/next.svg'
                    width='100%'
                    height='100%'
                    alt='Botão que leva para a próxima questão'
                  />
                </Button>
              </Box>
            </Form>
          </>
        ) : (
          <Box bg='neutral300' p='20px' borderRadius='10px' gap='20px'>
            <Image
              src='/icons/complete.svg'
              width='20px'
              height='20px'
              alt='Ícone sinalizando que a pesquisa já foi concluída'
            />
            <Text textAlign='center' fontSize='1.4rem'>
              Você concluiu esta pesquisa, obrigado!
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { questions } = await getQuestions(context.query.user as string)

  questions.sort((a, b) => {
    return a.order - b.order
  })

  const questionsWithSortedOptionSets = questions.map(question => {
    const optionSet = question.option_set

    optionSet.sort((a, b) => {
      return a.order - b.order
    })

    return { ...question, option_set: optionSet }
  })

  return {
    props: {
      questions: questionsWithSortedOptionSets,
      userId: context.query.user,
    },
  }
}

export default SearchForm
