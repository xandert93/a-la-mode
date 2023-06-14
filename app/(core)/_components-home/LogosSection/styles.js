const styles = {
  heading: {
    mb: 5,
    color: 'text.secondary',
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 5,
  },

  root: (theme) => ({
    filter: 'invert(50%)', // converts to greyscale, in effect

    ...(theme.palette.mode === 'dark' && {
      filter: 'grayscale(1) invert(80%)', // combination seems to convert to greyscale + brighten a little bit
    }),
  }),

  image: {
    maxWidth: '100%',
    maxHeight: 24,
  },
}

export default styles
