'use client'

import { Main } from '@/components'

import PropTypes from 'prop-types'

const verticalSpacing = { xs: 5, sm: 6, md: 7, lg: 8 }

const styles = {
  rowGap: verticalSpacing,
  '> :last-child': {
    mb: verticalSpacing, // because <Footer> is coming!
  },
}

export const HomeMain = ({ sx, ...props }) => {
  return <Main sx={[styles, sx]} {...props} />
}

HomeMain.propTypes = {
  sx: PropTypes.object,
  rowGap: PropTypes.oneOfType([PropTypes.number, PropTypes.objectOf(PropTypes.number)]),
}
