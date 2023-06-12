import { Header, Footer, Snackbar } from '@/components-layout'
import { SnackbarProvider } from '@/contexts/SnackbarProvider'
import { WishListProvider } from '@/contexts/WishListProvider'
import { BagProvider } from '@/contexts/BagProvider'

import { ThemeProvider } from '@/theme'

import Head from 'next/head'

import { usePathname } from 'next/navigation' // 🔥

export default function App({ Component, pageProps }) {
  const isAuthPage = usePathname().startsWith('/auth/') // JFN

  return (
    <>
      <Head>
        <title children={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta
          name="description"
          content="Menswear and Womenswear defined by fine tailoring and a quintessentially British style."
        />
      </Head>

      {isAuthPage ? (
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      ) : (
        <BagProvider>
          <WishListProvider>
            <ThemeProvider>
              <Header />
              <SnackbarProvider>
                <Component {...pageProps} />
                <Snackbar />
              </SnackbarProvider>
              <Footer />
            </ThemeProvider>
          </WishListProvider>
        </BagProvider>
      )}
    </>
  )
}
