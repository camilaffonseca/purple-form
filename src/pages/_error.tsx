import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Box } from 'components/atoms/Box'
import { Text } from 'components/atoms/Text'

const Err: NextPage = () => (
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
        <Image
          src='/icons/error.svg'
          width='40px'
          height='40px'
          alt='Ícone sinalizando que ocorreu um erro'
        />
        <Text textAlign='center' fontSize='1.4rem'>
          Ocorreu um erro ao obter os dados deste usuário. Tente novamente.
        </Text>
      </Box>
    </Box>
  </Box>
)

export default Err
