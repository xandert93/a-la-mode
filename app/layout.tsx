import { genPageTitle } from '@/utils/helpers'
import { ThemeProvider } from './ThemeProvider'

export const metadata = {
  title: genPageTitle(),
  description:
    'Menswear and Womenswear defined by fine tailoring and a quintessentially British style.',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  )
}
