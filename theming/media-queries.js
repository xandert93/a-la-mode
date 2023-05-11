import { breakpoints } from './config'

const { xs, sm, md, lg, xl } = breakpoints.values

// xs: 0, - 'xs' key now means anything in the range of 0 - 600px and so forth
// sm: 600,
// md: 960,
// lg: 1280,
// xl: 1536,

const isBetween = (key_1, key_2) => `@media (min-width:${key_1}px) and (max-width:${key_2}px)`
const isMin = (key) => `@media (min-width:${key}px)`
const isMax = (key) => `@media (max-width:${key}px)`

export const isVPXs = isMax(sm) // inverse is isVPMinSm...

export const isVPSm = isBetween(sm, md)
export const isVPMinSm = isMin(sm) //inverse is isVPXs...
export const isVPMaxSm = isMax(md)

export const isVPMd = isBetween(md, lg)
export const isVPMinMd = isMin(md)
export const isVPMaxMd = isMax(lg)

export const isVPLg = isBetween(lg, xl)
export const isVPMinLg = isMin(lg)
export const isVPMaxLg = isMax(xl)

export const isVPXl = isMin(xl)

export const isVPLandscape = '@media (orientation: landscape)' // 1
export const isVPXsAndLandscape = `${isVPXs} and (orientation: landscape)`
export const isVPMaxSmAndLandscape = `${isVPMaxSm} and (orientation: landscape)`

export const isHoverable = '@media (hover: hover) and (pointer: fine)' // 2

export const prefersDarkMode = '(prefers-color-scheme: dark)' // 3
/* 
🔥 1) https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation

🔥 2) https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
      https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer where "fine" represents a precise pointing device (e.g. mouse) and "coarse" represents an imprecise pointing device e.g. a finger on a touchscreen

🔥 3) https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme     
*/
