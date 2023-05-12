import { isVPXs } from '../media-queries'

export const overrideMui = (palette) => ({
  MuiCssBaseline: {
    styleOverrides: {
      'img, video': {
        display: 'block',
      },
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

  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {},
    },
  },

  MuiLink: {
    styleOverrides: {
      root: {
        display: 'block',
      },
    },
    defaultProps: {
      underline: 'none', // 'hover'*
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
      fullWidth: true,
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 15, // 16.5px 14px* (too big and `size` prop is useless - best I could do)
      },
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      expandIconWrapper: {
        color: 'inherit', // rgba(0, 0, 0, 0.54)*
      },
    },
  },

  // JTO
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: palette.primary.dark,
      },
    },
  },

  // JTO
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontSize: 30,
        [isVPXs]: {
          fontSize: 26.5,
        },
      },
    },
  },
})
