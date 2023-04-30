import { Box } from '@mui/material'

export const Form = ({ onSubmit, ...props }) => {
  return (
    <Box // 1
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
      autoComplete="off"
      spellCheck="false"
      {...props}
    />
  )
}

/*
🔥 1) Using Box just so that I can use `sx` prop from calling location
*/
