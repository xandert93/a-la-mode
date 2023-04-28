import { createTheme, responsiveFontSizes as createResponsiveTheme } from '@mui/material'

export const theme = createResponsiveTheme(
  createTheme({
    palette: {
      mode: 'dark',
    },

    typography: {
      fontFamily: ['Rubik', 'sans-serif'].join(','), // Rubik imported from Google into _document.js (recommended)

      h1: {
        fontWeight: 'bold', // 300*
      },
      h2: {
        fontWeight: 'bold', // 300*
      },
      h3: {
        fontWeight: 'bold', // 400*
      },
      h4: {
        fontWeight: 'bold', // 400*
      },
      h5: {
        fontWeight: 'bold', // 400*
      },
      h6: {
        fontWeight: 'bold', // 500*
      },
    },
  }),
  {
    breakpoints: ['sm', 'md', 'lg'],
    factor: 2,
  }
)
