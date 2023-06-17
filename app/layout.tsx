import './global.css' // 🚧 - has Ephesis font. But should use Google approach later

import { genPageTitle } from '@/utils/helpers'
import { ThemeProvider } from './ThemeProvider'
import { AuthProvider } from './AuthProvider'

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
        <AuthProvider>
          <body>{children}</body>
        </AuthProvider>
      </ThemeProvider>
    </html>
  )
}
