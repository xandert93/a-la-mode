import { Box, Button, CircularProgress, ButtonProps } from '@mui/material'
// import { RoundedButton } from '../RoundedButton'

import styles from './styles'

type Props = ButtonProps & {
  isLoading: boolean
}

export const LoadingButton = ({ children, sx, disabled, isLoading, ...props }: Props) => {
  return (
    <Button sx={Object.assign(styles.root, sx)} disabled={disabled || isLoading} {...props}>
      {children}
      {isLoading && (
        <Box sx={styles['progress-box']}>
          <CircularProgress size="1.25em" />
        </Box>
      )}
    </Button>
  )
}

/*
1) This works well, because depending on the `size` prop we pass to <Button>, the font-size
   adapts accordingly. The <CircularProgress> doesn't have a font-size set, so it inherits 
   this dynamic value from <Button>.

2) Unfortunately, we can't apply the centering via a `transform` on <CircularProgress>, as
   it clashes with it's own `transform`. So we've wrapped it in a <div> and centered that
   instead.
*/
