import { Rubik } from 'next/font/google'
import { isVPSm, isVPXs } from './media-queries'

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const typography = {
  fontFamily: rubik.style.fontFamily,

  h1: {
    fontWeight: 500, // 300*
    lineHeight: 1.2, // 1.167* (all lineHeight changes 👇 are 🚧, trying to make them more predictable)
  },
  h2: {
    fontWeight: 500, // 300*
    lineHeight: 1.2, // 1.2*
  },
  h3: {
    fontWeight: 500, // 400*
    lineHeight: 1.2, // 1.167*
  },
  h4: {
    fontWeight: 500, // 400*
    fontSize: '2.5rem', // ~2rem* (felt like a big drop off from <h3>'s ~3rem)
    lineHeight: 1.2, // 1.235*
  },
  h5: {
    fontWeight: 500, // 400*
    fontSize: '2rem', // ~1.5rem* (felt like a big drop off from <h4>'s new ~2.5rem)
    lineHeight: 1.2, // 1.334*
  },
  h6: {
    fontWeight: 500, // 500*
    fontSize: '1.5rem', // ~1.25rem* (felt like a big drop off from <h5>'s new ~2rem)
    lineHeight: 1.2, // 1.6*
  },

  body1: {
    [isVPXs]: {
      fontSize: '0.9rem', // => 14.4px
    },
    [isVPSm]: {
      fontSize: '0.95rem', // => 15.2px
    },
    fontSize: '1rem', // default => 16px
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
}
