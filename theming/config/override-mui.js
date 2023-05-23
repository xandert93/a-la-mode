import { alertClasses } from '@mui/material'
import { isVPMaxSm, isVPMinSm, isVPXs } from './media-queries'

export const overrideMui = (palette) => ({
  MuiCssBaseline: {
    styleOverrides: {
      'img, video': {
        display: 'block',
      },

      // [isVPMaxSm]: {
      //   'body::-webkit-scrollbar': {
      //     display: 'none',
      //   },
      // },
    },
  },

  MuiAppBar: {
    defaultProps: {
      color: 'inherit', // 'primary'* (sets background-color)
    },
  },

  MuiToolbar: {
    styleOverrides: {
      root: {
        [isVPMinSm]: {
          paddingLeft: 16, // 24px*
          paddingRight: 16, // 24px*
        },
        [isVPXs]: {
          paddingLeft: 8, // 16px*
          paddingRight: 8, // 16px*
        },
      },
    },
  },

  MuiContainer: {
    defaultProps: {
      maxWidth: false,
    },
  },

  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },

  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        borderRadius: 8, // '4px'*
      },
    },
  },

  MuiFormControl: {
    defaultProps: {
      variant: 'standard', // outlined*
    },
  },

  MuiLink: {
    defaultProps: {
      variant: 'body1', // 'inherit'*
      color: 'inherit', // 'primary'*
      underline: 'none', // 'always*'
    },
    styleOverrides: {
      root: {
        display: 'block',
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
        color: 'inherit', // rgba(0, 0, 0, 0.54)*
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      required: true,
      fullWidth: true,
    },
  },

  MuiFormControl: {
    defaultProps: {
      required: true,
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        color: 'inherit', // uses <Paper> classes* (i.e. theme.palette.text.primary)
        backgroundColor: 'transparent', // uses <Paper> classes* (i.e. theme.palette.background.primary)
      },
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        minHeight: 'initial', // 48px* (kinda whack)
        padding: 'initial', // 0px 16px* (kinda whack)
      },

      content: {
        margin: 'initial', // 12px 0px (kinda whack)
      },

      expandIconWrapper: {
        color: 'inherit', // rgba(0, 0, 0, 0.54)*
      },
    },
  },

  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        // JTO
        padding: 'initial', // 8px 16px 16px* (kinda whack?)
      },
    },
  },

  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        minWidth: 64, // default
        borderRadius: 4, // default
      },
      text: {
        fontWeight: 400, // 500*
      },

      outlined: {
        padding: '5px 15px', // default
        fontWeight: 400, // 500*
      },

      // JTO:
      containedSizeSmall: {
        padding: '5px 15px',
        fontSize: 'initial', // 0.8125rem* (but will now revert to theme.typography.button styles)
      },

      // JTO:
      containedSizeMedium: {
        padding: '12px 16px', // '6px 16px'*
      },
    },
  },

  // JTO
  MuiIconButton: {
    defaultProps: {
      color: 'primary', // 'default'* (?)
    },
  },

  // JTO
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        // fontSize: 28,
        // [isVPXs]: {
        //   fontSize: 24,
        // },
      },
    },
  },

  MuiRating: {
    defaultProps: {
      readOnly: true,
      precision: 0.1,
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        // JTO - ensures icon, text and action button are all vertically centered irrespective of their individual heights
        display: 'flex',
        alignItems: 'center',
      },
    },
  },

  MuiSnackbar: {
    styleOverrides: {
      root: {
        // JTO, but at xs, <Snackbar> receives offsets of { left: 8px, right: 8px, bottom: 8px }, making it span width of bottom of VP basically
        // <Snackbar> is also a flexbox. If an <Alert> is placed as child, by default, it doesn't consume that new extra space.
        // This configuration achieves that
        ['& .' + alertClasses.root]: {
          flexGrow: 1,
        },
      },
    },
  },
})
