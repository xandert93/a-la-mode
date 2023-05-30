import { formatCurrency } from '@/utils/formatters'
import { Typography, TypographyProps } from '@mui/material'

type Props = {
  children: number
}

export function MoneyTypography<C extends React.ElementType>({
  children: amount,
  ...props
}: Props & TypographyProps<C, { component?: C }>) {
  return <Typography {...props} children={formatCurrency(amount)} />
}
