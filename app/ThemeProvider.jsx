'use client'

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'

import { darkTheme, lightTheme } from '@/theme/themes'
import { useIsDarkMode } from '@/features/ui/state'

export const ThemeProvider = ({ children }) => {
  // const userPrefersDarkMode = useMediaQuery(prefersDarkMode)

  const isDarkMode = useIsDarkMode()

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
