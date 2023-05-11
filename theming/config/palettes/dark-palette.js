import { createTheme as createMuiTheme } from '@mui/material'

const { palette } = createMuiTheme({
  palette: {
    mode: 'dark',

    text: {
      primary: '#e9e8de',
    },
  },
})

export { palette as darkPalette }
