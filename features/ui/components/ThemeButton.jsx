'use client'

import { Button } from '@mui/material'
import { useToggleDarkMode } from '../state'

export const ThemeButton = () => {
  const toggleDarkMode = useToggleDarkMode()

  return <Button onClick={toggleDarkMode} children="💡" />
}
