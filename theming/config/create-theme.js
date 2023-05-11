import {
  createTheme as createMuiTheme,
  responsiveFontSizes as createResponsiveTheme,
} from '@mui/material'

import { breakpoints, mixins, palettes, typography, overrideMui } from '.'

const createBaseTheme = ({ isDarkMode }) => {
  const palette = palettes[isDarkMode ? 'dark' : 'light'] // so we can use palette in `createMuiTheme`

  return createMuiTheme({
    breakpoints,
    palette,
    typography,
    mixins,
    components: overrideMui(palette),
  })
}

export const createTheme = (props) => {
  const baseTheme = createBaseTheme(props)

  return createResponsiveTheme(baseTheme, {
    breakpoints: ['sm', 'md', 'lg'],
    factor: 2,
  })
}
