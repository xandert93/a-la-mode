import { Main } from '@/components'

import PropTypes from 'prop-types'

export const HomeMain = (props) => {
  return <Main rowGap={{ xs: 5, sm: 6, md: 7, lg: 8 }} {...props} />
}

HomeMain.propTypes = {
  sx: PropTypes.object,
  rowGap: PropTypes.oneOfType([PropTypes.number, PropTypes.objectOf(PropTypes.number)]),
}
