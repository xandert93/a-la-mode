import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Button,
  useMediaQuery,
} from '@mui/material'
import { useEffectOnMount, useEffectOnUpdate, useToggle } from '@/hooks'

import { lightTheme, darkTheme } from './themes'
import { prefersDarkMode } from './config/media-queries'

export const ThemeProvider = ({ children }) => {
  // const userPrefersDarkMode = useMediaQuery(prefersDarkMode)
  const [isDarkMode, toggleDarkMode] = useToggle()

  // JFN (not ideal, but only way to get LS logic to run on client):
  useEffectOnMount(() => {
    const initialDarkMode = JSON.parse(localStorage.getItem('isDarkMode'))
    toggleDarkMode(initialDarkMode)
  })

  useEffectOnUpdate(() => {
    localStorage.setItem('isDarkMode', isDarkMode)
  }, [isDarkMode])

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
      {/* 👇 JFN */}
      <Button onClick={toggleDarkMode} children="💡" />
    </MuiThemeProvider>
  )
}
