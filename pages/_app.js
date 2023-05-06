import { Header, Footer } from '@/components-layout'
import { NAMES } from '@/constants'

import { theme } from '@/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title children={NAMES.COMPANY} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}
