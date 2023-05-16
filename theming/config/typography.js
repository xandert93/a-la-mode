import { isVPSm, isVPXs } from './media-queries'

export const typography = {
  fontFamily: 'Rubik, sans-serif', // Rubik imported from Google into _document.js (recommended)

  h1: {
    fontWeight: 500, // 300*
  },
  h2: {
    fontWeight: 500, // 300*
  },
  h3: {
    fontWeight: 500, // 400*
  },
  h4: {
    fontWeight: 500, // 400*
    fontSize: '2.5rem', // ~2rem* (felt like a big drop off from <h3>'s ~3rem)
  },
  h5: {
    fontWeight: 500, // 400*
    fontSize: '2rem', // ~1.5rem* (felt like a big drop off from <h4>'s new ~2.5rem)
  },
  h6: {
    fontWeight: 500, // 500*
    // fontSize: '1.25rem'
  },

  body1: {
    [isVPXs]: {
      fontSize: '0.9rem', // => 14.4px
    },
    [isVPSm]: {
      fontSize: '0.95rem', // => 15.2px
    },
    // fontSize: '1rem' // => 16px
  },
  body2: {
    [isVPXs]: {
      fontSize: '0.8rem', // => 13.2px
    },
    [isVPSm]: {
      fontSize: '0.85rem', // => 13.6px
    },
    fontSize: '0.9rem', // 0.875rem* => 14px, new is => 14.4px
  },

  button: {
    fontWeight: 400, // 500*
  },
}
