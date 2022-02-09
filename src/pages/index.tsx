import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'

import { Box } from 'components/atoms/Box'
import { Button } from 'components/atoms/Button'
import { Input } from 'components/atoms/Input'
import { Text } from 'components/atoms/Text'

const Home: NextPage = () => {
  const [userInput, setUserInput] = useState('')

  const router = useRouter()

  const handleEnter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (e.key === 'Enter') {
        router.push(`/${userInput}`)
      }
    },
    [router, userInput]
  )

  useEffect(() => {
    window.addEventListener('keypress', handleEnter)

    return () => {
      window.removeEventListener('keypress', handleEnter)
    }
  }, [handleEnter, router, userInput])

  return (
    <Box
      h='100vh'
      w='100vw'
      justifyContent={{ _: 'unset', md: 'center' }}
      alignItems='center'
    >
      <Head>
        <title>Oops | Purple Metrics</title>
      </Head>
      <Box
        as='main'
        w='100%'
        maxWidth='500px'
        gap={{ _: '50px', md: '60px' }}
        p={{ _: '20px', md: 0 }}
        mt={{ _: '50px', md: 0 }}
      >
        <Box bg='neutral300' p='20px' borderRadius='10px' gap='20px'>
          <Text textAlign='center' fontSize='1.2rem'>
            Insira com qual usuário deseja acessar a pesquisa:
          </Text>
          <Input
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            aria-label='Input para o usuário que o sistema deve acessar'
          />
          <Box w='100%' flexDirection='row' justifyContent='flex-end'>
            <Button
              w={62}
              type='button'
              mt='12px'
              onClick={() => router.push(`/${userInput}`)}
              aria-label='Botão que leva para a pesquisa do usuário inserido'
            >
              <Image
                src='/icons/next.svg'
                width='100%'
                height='100%'
                alt='Botão que leva para a pesquisa do usuário inserido'
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
