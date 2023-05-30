import { Button, ButtonProps } from '@mui/material'
import Link from 'next/link'

type Props = {
  href: string
} & ButtonProps

export const ButtonLink = (props: Props) => {
  return <Button {...props} />
}
