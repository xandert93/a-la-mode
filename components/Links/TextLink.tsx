import { isHoverable } from '@/theming'
import { Link, LinkProps } from '@mui/material'
import NextLink from 'next/link'
import PropTypes from 'prop-types'

type SxProps = {
  hover?: boolean
}

const styles = ({ hover }: SxProps) => ({
  display: 'inline', // since in overrides, I've made it { display: block }

  ...(hover && {
    [isHoverable]: {
      transition: 'filter 0.2s',
      ':hover': {
        filter: 'saturate(300%)',
      },
    },
  }),
})

type Props = LinkProps & {
  hover?: boolean
}

// MUI's <Link> is built on top of <Typography> - can use its props
// however, by default color='primary' (stand out) and variant='inherit' (since MUI say <Link> is mostly used inside a <Typography>)
export const TextLink = ({ sx, hover = false, ...props }: Props) => {
  return <Link sx={Object.assign(styles({ hover }), sx)} component={NextLink} {...props} />
}
