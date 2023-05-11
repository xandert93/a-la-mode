import { isVPMaxSm } from '@/theming'

const styles = {
  root: {
    [isVPMaxSm]: {
      padding: 'initial',
    },
  },

  content: {
    backgroundColor: 'primary.touch',
    padding: { xs: 3, sm: 4 },
    rowGap: { xs: 3, md: 4 },
    textAlign: 'center',
  },

  'text-field': {
    width: '100%',
    maxWidth: 320,
  },

  'input-base': {
    borderRadius: ({ spacing }) => spacing(0.5, 0, 0, 0.5),
  },

  input: {
    padding: 1.5, // 16.5px 14px*
  },

  button: {
    borderRadius: ({ spacing }) => spacing(0, 0.5, 0.5, 0),
    boxShadow: 'none',
    width: '10ch',
  },
}

export default styles
