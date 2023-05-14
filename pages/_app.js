import { Header, Footer } from '@/components-layout'
import { NAMES } from '@/constants'
import { ThemeProvider } from '@/theming'

import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title children={NAMES.COMPANY} />
        <meta
          name="description"
          content="Menswear and Womenswear defined by fine tailoring and a quintessentially British style."
        />
      </Head>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
        {/* <SnackbarProvider>
          <Component {...pageProps} />
          <Snackbar />
        </SnackbarProvider> */}
        <Footer />
      </ThemeProvider>
    </>
  )
}
