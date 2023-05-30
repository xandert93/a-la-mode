import { Grid, Typography, TypographyProps, GridProps } from '@mui/material'
import { MoneyTypography, Span } from './Typographies'

type Props = {
  title: string
  amount: number
} & TypographyProps &
  GridProps

export const CostRow = ({ title, amount, ...props }: Props) => {
  return (
    <Typography {...props} component={Grid} container justifyContent="space-between">
      <Span children={title} />
      <MoneyTypography component="span" variant="inherit" children={amount} />
    </Typography>
  )
}

// I did see some website use HTML tables e.g. <td>, <tr>, <th> etc. Checked MUI's tables and just seemed like a lot of boilerplate for this table's needs
