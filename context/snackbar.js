import { Snackbar as MuiSnackbar } from '@mui/material'
import { createContext, useContext, useState } from 'react'

const snackbarContext = createContext()
export const useSnackbar = () => useContext(snackbarContext)

export const SnackbarProvider = (props) => {
  const [state, setSnackbar] = useState({
    isOpen: false,
    message: '',
  })

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, isOpen: false }))
  const openSnackbar = (message) => setSnackbar((prev) => ({ ...prev, isOpen: true, message }))

  return <snackbarContext.Provider value={{ ...state, openSnackbar, closeSnackbar }} {...props} />
}

export const Snackbar = () => {
  const { isOpen, message, closeSnackbar } = useSnackbar()

  return (
    <MuiSnackbar open={isOpen} message={message} autoHideDuration={6000} onClose={closeSnackbar} />
  )
}
