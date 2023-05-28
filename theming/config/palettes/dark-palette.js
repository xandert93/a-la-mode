import { createTheme as createMuiTheme } from '@mui/material'
import { lightGreen, orange, blue, red, yellow } from '@mui/material/colors'

const { palette } = createMuiTheme({
  palette: {
    mode: 'dark',

    text: {
      primary: '#e8e6d5',
      secondary: '#bab9af',
      tertiary: blue[100], // a light color!
    },

    primary: {
      touch: blue[100],
      main: blue[500],
      heavy: blue[900],
    },
    secondary: {
      main: orange[500],
    },
    tertiary: {
      light: yellow[300],
      main: yellow[500],
      dark: yellow[700],
    },

    success: {
      main: lightGreen.A400, // bright green that suits dark background
    },

    error: {
      main: red.A200, // lighter red that that suits dark background
    },

    background: {
      default: '#121212', // default
      paper: '#121212', // default
    },
  },
})

export { palette as darkPalette }
