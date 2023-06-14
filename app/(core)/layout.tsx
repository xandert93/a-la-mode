import { Header, Footer, Snackbar } from './_components-layout'

import { BagProvider } from '@/contexts/BagProvider'
import { WishListProvider } from '@/contexts/WishListProvider'
import { SnackbarProvider } from '@/contexts/SnackbarProvider'

type Props = {
  children: React.ReactNode
}

export default function CoreLayout({ children }: Props) {
  return (
    <>
      <BagProvider>
        <WishListProvider>
          <Header />
          <SnackbarProvider>
            {children}
            <Snackbar />
          </SnackbarProvider>
        </WishListProvider>
      </BagProvider>
      <Footer />
    </>
  )
}
