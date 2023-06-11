import { createContext, useContext } from 'react'

export type SnackbarContextValue = {
  isOpen: boolean
  type: string
  message: string

  success: (data: { type: string; message: string }) => void
  error: (message: string) => void
  close: () => void
}

const initialValue = {
  isOpen: false,
  type: '',
  message: '',

  success: (data: { type: string; message: string }) => {},
  error: (message: string) => {},
  close: () => {},
}

export const snackbarContext = createContext<SnackbarContextValue>(initialValue)
export const useSnackbar = () => useContext(snackbarContext)
