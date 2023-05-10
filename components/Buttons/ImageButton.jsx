import { isHoverable } from '@/theme'
import { Button } from '@mui/material'

const styles = (outlined) => {
  const outlinedStyles = {
    color: 'white',
  }

  const containedStyles = {
    color: 'black',
    backgroundColor: 'white',
  }

  return {
    minWidth: '15ch',
    border: '1px solid white',

    // *** probably more efficient way of doing this:
    ...(outlined ? outlinedStyles : containedStyles),
    [isHoverable]: {
      ':hover': {
        ...(outlined ? containedStyles : outlinedStyles),
      },
    },
  }
}

export const ImageButton = ({ sx, outlined, ...props }) => {
  return <Button sx={[styles(outlined), sx]} {...props} />
}
