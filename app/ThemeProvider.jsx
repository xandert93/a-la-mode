'use client'

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'

import { darkTheme, lightTheme } from '@/theme/themes'
import { useIsDarkMode, useToggleDarkMode } from '@/features/ui/state'
import { useEffectOnMount } from '@/hooks'

export const ThemeProvider = ({ children }) => {
  // const userPrefersDarkMode = useMediaQuery(prefersDarkMode)

  const isDarkMode = useIsDarkMode()
  const toggleDarkMode = useToggleDarkMode()

  // 🚧 tried to implement this effect directly in Zustand store, but was buggy on client first render...
  useEffectOnMount(() => {
    const lsVal = localStorage.getItem('isDarkMode')
    if (lsVal) toggleDarkMode(JSON.parse(lsVal))
  })

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
