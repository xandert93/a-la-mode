'use client'

import { ThemeProvider as MuiThemeProvider, CssBaseline, Button } from '@mui/material'

import { darkTheme, lightTheme } from '@/theme/themes'
import { useEffectOnMount, useEffectOnUpdate, useToggle } from '@/hooks'

export const ThemeProvider = ({ children }) => {
  // const userPrefersDarkMode = useMediaQuery(prefersDarkMode)
  const [isDarkMode, toggleDarkMode] = useToggle() // server renders a RCC first...localStorage can't be

  // JFN (not ideal, but only way to get LS logic to run on client):
  useEffectOnMount(() => {
    const initialDarkMode = localStorage.getItem('isDarkMode')
    if (initialDarkMode) toggleDarkMode(JSON.parse(initialDarkMode))
  })

  useEffectOnUpdate(() => {
    localStorage.setItem('isDarkMode', isDarkMode)
  }, [isDarkMode])

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
      {/* <Button onClick={toggleDarkMode} children="💡" /> */}
    </MuiThemeProvider>
  )
}

// localStorage exists on window. With CSR, we were able to access LS globally since code was running in browser
// now, though, all components render (execute + return) on server first and then render again on client (apparently improves performance on client)
// when rendering on server, window doesn't exist
// thus, attempting to use `localStorage` will produce following error:
// ReferenceError: localStorage is not defined
