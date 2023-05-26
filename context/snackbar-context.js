import { ClearIcon } from '@/components'
import { HeartIcon, IconButton, IconTypography, ShoppingBagIcon } from '@/components'
import { Alert, Snackbar as MuiSnackbar, SnackbarContent, alpha } from '@mui/material'
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
    type: state.type,
    message: state.message,

    success: ({ type, message }) => {
      setSnackbar((prev) => ({ ...prev, isOpen: true, type, message }))
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

// All JFN - let's see where it goes
export const Snackbar = () => {
  const { isOpen, type, message, close } = useSnackbar()

  let Icon

  switch (type) {
    case 'save':
      Icon = HeartIcon
      break
    case 'add':
      Icon = ShoppingBagIcon
  }

  return (
    <MuiSnackbar open={isOpen} autoHideDuration={6000} onClose={close}>
      <SnackbarContent
        elevation={8}
        sx={{ bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.95), borderRadius: 7 }}
        message={
          <IconTypography Icon={Icon} IconFontSize="medium" children={message} columnGap={1.5} />
        }
        action={
          <IconButton
            color="inherit"
            onClick={close}
            children={<ClearIcon fontSize="small" />}
            shaded={false}
          />
        }
      />
    </MuiSnackbar>
  )

  return (
    <MuiSnackbar open={isOpen} autoHideDuration={6000} onClose={close}>
      <Alert
        severity={type} // 'success | error | warning | info'. Determines icon used + snackbar color
        onClose={close} //if provided and no "action" button prop specified, displays <CloseIcon /> as action button
      >
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
