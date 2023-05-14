import { Button } from '@mui/material'
import styles from './styles'

export const OutlinedButton = ({ sx, elevation, children, ...props }) => {
  return (
    <Button variant="outlined" sx={[styles({ elevation }), sx]} {...props}>
      <span>{children}</span>
    </Button>
  )
}
