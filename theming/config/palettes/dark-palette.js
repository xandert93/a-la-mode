import { createTheme as createMuiTheme } from '@mui/material'
import { orange, red, yellow } from '@mui/material/colors'

const { palette } = createMuiTheme({
  palette: {
    mode: 'dark',

    primary: {
      touch: red[100],
      main: red[500],
      heavy: red[900],
    },
    secondary: {
      main: orange[500],
    },
    tertiary: {
      light: yellow[300],
      main: yellow[500],
      dark: yellow[700],
    },

    text: {
      primary: '#e9e8de',
    },
  },
})

export { palette as darkPalette }
