import { Alert, Snackbar as MuiSnackbar } from '@mui/material'
import { createContext, useContext, useState } from 'react'

const context = createContext()
export const useSnackbar = () => useContext(context)

export const SnackbarProvider = (props) => {
  const [state, setSnackbar] = useState({
    isOpen: false,
    type: '',
    message: '',
  })

  const snackbar = {
    isOpen: state.isOpen,
    message: state.message,

    success: (message) => {
      setSnackbar((prev) => ({ ...prev, isOpen: true, type: 'success', message }))
    },
    error: (message) => {
      setSnackbar((prev) => ({ ...prev, isOpen: true, type: 'error', message }))
    },

    close: () => {
      setSnackbar((prev) => ({ ...prev, isOpen: false }))
    },
  }

  return <context.Provider value={snackbar} {...props} />
}

export const Snackbar = () => {
  const { isOpen, type, message, close } = useSnackbar()

  return (
    <MuiSnackbar open={isOpen} message={message} autoHideDuration={6000} onClose={close}>
      <Alert
        severity={type} // 'success | error | warning | info'. Determines icon used + snackbar color
        onClose={close} //if provided and no "action" button prop specified, displays <CloseIcon /> as action button
      >
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
