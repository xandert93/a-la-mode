import { Button } from '@mui/material'
import { forwardRef } from 'react'

const styles = {
  borderRadius: 8,
}

export const RoundedButton = forwardRef(({ sx, ...props }, ref) => {
  return (
    <Button
      ref={ref} // 1
      sx={[styles, sx]}
      {...props}
    />
  )
})

/*
1) Transition component wants it to hold a ref

*/
