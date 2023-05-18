import { Box } from '@mui/material'
import PropTypes from 'prop-types'

export const Main = (props) => {
  return <Box component="main" display="flex" flexDirection="column" {...props} />
}

Main.propTypes = {
  sx: PropTypes.object,
  rowGap: PropTypes.oneOfType([PropTypes.number, PropTypes.objectOf(PropTypes.number)]),
}

// 🔥 Refraining from using <Grid container> for sake of cleaner Chrome DevTools classes. Where it makes sense, I'm happy to write custom CSS
// 🔥 As above, I'm not opposed to using MUI inline styling props if the component is purely presentational + sole job is to get custom CSS
