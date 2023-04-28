import { createTheme, responsiveFontSizes as createResponsiveTheme } from '@mui/material'
import { isVPXs } from './media-queries'

export const theme = createResponsiveTheme(
  createTheme({
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            padding: 24,
            [isVPXs]: {
              padding: 16,
            },
          },
        },
      },

      MuiListItem: {
        defaultProps: {
          disableGutters: true,
        },
      },

      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 40, // 56px* (too big and looks shit)
          },
        },
      },
    },

    palette: {
      mode: 'light',
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
