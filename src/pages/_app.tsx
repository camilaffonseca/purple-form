import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@xstyled/styled-components'

import { GlobalStyle } from 'theme/globalStyle'
import { theme } from 'theme/globalTheme'

import 'react-toastify/dist/ReactToastify.css'
import 'theme/preflight.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ToastContainer />
    <Component {...pageProps} />
  </ThemeProvider>
)

export default MyApp
