import { Button } from '@mui/material'

const styles = {
  width: '15ch',
  borderColor: 'common.white',
  ':hover': {
    color: 'common.black',
    backgroundColor: 'common.white',
  },
}

export const HomeHeroButton = ({ href, children }) => {
  return (
    <Button
      variant="outlined"
      color="inherit" // only way to get white MUI styling (for now)
      href={href}
      children={children}
      sx={styles}
    />
  )
}
