import { Box, BoxProps } from '@mui/material'

type Props = {
  onSubmit: (e: React.FormEvent) => void
} & BoxProps

export const Form = ({ onSubmit, ...props }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <Box // 1
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      spellCheck="false"
      {...props}
    />
  )
}

/*
🔥 1) Using Box just so that I can use `sx` prop from calling location
*/
