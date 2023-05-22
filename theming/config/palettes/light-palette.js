import { createTheme } from '@mui/material'
import { brown } from '@mui/material/colors'

const { palette } = createTheme({
  palette: {
    mode: 'light',

    text: {
      tertiary: brown[700],
    },

    primary: {
      main: brown[300], // light brown
      touch: brown[50],
      heavy: brown[900],
    },

    secondary: {
      main: '#234E70', // royal blue
    },

    tertiary: {
      main: '#7A2048', // maroon
    },

    background: {
      background: '#fff', // default
      paper: '#fff', // default
    },
  },
})

export { palette as lightPalette }
