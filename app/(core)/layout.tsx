import { BagProvider } from '@/contexts/BagProvider'
import { WishListProvider } from '@/contexts/WishListProvider'

import { Header, Footer, Snackbar } from '@/components-layout'
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
