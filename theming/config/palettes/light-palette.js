import { createTheme } from '@mui/material'
import { brown } from '@mui/material/colors'

const { palette } = createTheme({
  palette: {
    mode: 'light',

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
  },
})

export { palette as lightPalette }
