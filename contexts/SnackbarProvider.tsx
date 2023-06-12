'use client'

import { useState } from 'react'
import { SnackbarContextValue, snackbarContext } from './snackbar-context'

type Props = {
  children: React.ReactNode
}

export const SnackbarProvider = (props: Props) => {
  const [state, setSnackbar] = useState({
    isOpen: false,
    type: '',
    message: '',
  })

  props.children

  const value: SnackbarContextValue = {
    isOpen: state.isOpen,
    type: state.type,
    message: state.message,

    success: ({ type, message }: { type: string; message: string }) => {
      setSnackbar((prev) => ({ ...prev, isOpen: true, type, message }))
    },
    error: (message: string) => {
      setSnackbar((prev) => ({ ...prev, isOpen: true, type: 'error', message }))
    },

    close: () => {
      setSnackbar((prev) => ({ ...prev, isOpen: false }))
    },
  }

  return <snackbarContext.Provider value={value} {...props} />
}
