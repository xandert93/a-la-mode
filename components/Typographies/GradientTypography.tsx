import { Typography, TypographyProps } from '@mui/material'

type SxProps = {
  color1: string
  color2: string
  degs: string | number
}

const styles = ({ degs, color1, color2 }: SxProps) => ({
  backgroundImage: `linear-gradient(${degs}, ${color1}, ${color2})`,
  color: 'transparent',
  '-webkit-background-clip': 'text',
})

type Props = TypographyProps & SxProps

export const GradientTypography = ({ sx, color1, color2, degs, ...props }: Props) => {
  return <Typography sx={Object.assign(styles({ color1, color2, degs }), sx)} {...props} />
}
