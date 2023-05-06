export const mixins = {
  absCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  absCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  coverImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  gradientColor: (angle = 135, color1, color2) => ({
    backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
    color: 'transparent',
    '-webkit-background-clip': 'text',
  }),
}
