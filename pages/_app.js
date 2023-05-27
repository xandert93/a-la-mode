import { Header, Footer } from '@/components-layout'
import { NAMES, PATHS } from '@/constants'
import { StoreProvider } from '@/context/global-context'
import { SnackbarProvider, Snackbar } from '@/context/snackbar-context'
import { ThemeProvider } from '@/theming'

import Head from 'next/head'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter() // 1
  const isAuthPage = [PATHS.LOGIN, PATHS.REGISTRATION].includes(router.pathname) // JFN

  return (
    <>
      <Head>
        <title children={NAMES.COMPANY} />
        <meta
          name="description"
          content="Menswear and Womenswear defined by fine tailoring and a quintessentially British style."
        />
      </Head>
      <StoreProvider>
        {isAuthPage ? (
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        ) : (
          <ThemeProvider>
            {/* <Header /> */}
            <SnackbarProvider>
              <Component {...pageProps} />
              <Snackbar />
            </SnackbarProvider>
            {/* <Footer /> */}
          </ThemeProvider>
        )}
      </StoreProvider>
    </>
  )
}

/*
1) Apparently Next 13 solves this issue "out of the box" ?: https://stackoverflow.com/questions/67663919/how-to-hide-header-only-at-one-page-in-nextjs-app
*/
