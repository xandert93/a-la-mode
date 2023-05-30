import { createTheme } from '@mui/material'
import { brown, green, yellow } from '@mui/material/colors'

// This code 👇 seems to permanently mutate the interfaces
// Thus seemingly no need to repeat in other palette scripts e.g. dark-palette.ts
// Thus, abstract to another file? - I did try, but got errors

declare module '@mui/material/styles' {
  // mutate Palette and PaletteOptions interfaces to permit extra palettes
  interface Palette {
    tertiary: Palette['primary']
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary']
  }

  // mutate PaletteColor and SimplePaletteColorOptions interfaces to permit extra palette shades
  interface PaletteColor {
    touch?: string
    heavy?: string
  }
  interface SimplePaletteColorOptions {
    touch?: string
    heavy?: string
  }

  // mutate TypeText interface to permit extra palette shade on palette.text
  interface TypeText {
    tertiary: string
  }
}

const { palette } = createTheme({
  palette: {
    mode: 'light',

    text: {
      tertiary: brown[700], // a dark color!
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

    success: {
      main: green.A700, // livelier green
    },

    info: {
      main: yellow.A700, // near gold
    },

    background: {
      default: '#fff', // default
      paper: '#fff', // default
    },
  },
})

export { palette as lightPalette }
