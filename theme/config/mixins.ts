// JFN ***
declare module '@mui/material/styles' {
  interface Theme {
    mixins: {
      toolbar: object // without this, toolbar not typed...why?
      absCenter: object
      absCover: object
      coverImage: object
      textOutline: (color: string) => object
      textShadowDark: object
      gradientColor: (angle: number | string, color1: number, color2: number) => object
      lineClamp: (count: number) => object
    }
  }
}

export const mixins = {
  absCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  },

  absCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  textOutline: (color: string) => ({
    textShadow: `1.5px 1px 1px ${color}`,
  }),

  // around white text
  textShadowDark: {
    textShadow: '0 2px 24px rgba(0, 0, 0, 0.6)',
  },

  gradientColor: (angle: number, color1: number, color2: number) => ({
    backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
    color: 'transparent',
    '-webkit-background-clip': 'text',
  }),

  lineClamp: (count: number) => ({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: `${count}`, // number of lines to show
    lineClamp: `${count}`, // used if browser accepts it
    overflow: 'hidden',
  }),
}
