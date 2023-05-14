const styles = ({ elevation = 0 }) => ({
  minWidth: '15ch',
  boxShadow: elevation,
  ':hover': {
    boxShadow: 2,
    backgroundColor: 'currentColor',

    '> span': {
      color: 'background.default', // *** doesn't work when color='inherit'!
    },
  },
})

export default styles
