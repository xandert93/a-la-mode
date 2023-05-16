import { Button } from '@mui/material'

const styles = ({ outlined, elevation = 0 }) => {
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
    boxShadow: elevation,

    // *** probably more efficient way of doing this:
    ...(outlined ? outlinedStyles : containedStyles),

    // *** should only apply if [isHoverable], but that causes small styling bug. Fix later
    ':hover': {
      boxShadow: 2,
      ...(outlined ? containedStyles : outlinedStyles),
    },
  }
}

export const ImageButton = ({ sx, outlined, elevation, ...props }) => {
  return <Button variant="text" sx={[styles({ outlined, elevation }), sx]} {...props} />
}
