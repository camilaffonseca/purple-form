import type { AppProps } from 'next/app'

import { ThemeProvider } from '@xstyled/styled-components'

import { GlobalStyle } from 'theme/globalStyle'
import 'theme/preflight.css'
import { theme } from 'theme/globalTheme'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Component {...pageProps} />
  </ThemeProvider>
)

export default MyApp
