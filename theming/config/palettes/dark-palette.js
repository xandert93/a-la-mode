import { createTheme as createMuiTheme } from '@mui/material'
import { orange, red, yellow } from '@mui/material/colors'

const { palette } = createMuiTheme({
  palette: {
    mode: 'dark',

    text: {
      primary: '#e8e6d5',
      secondary: '#bab9af',
      tertiary: red[100],
    },

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

    background: {
      default: '#121212', // default
      paper: '#121212', // default
    },
  },
})

export { palette as darkPalette }
