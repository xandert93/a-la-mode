import { NAMES } from '@/constants'

export const Title = ({ pageName }) => {
  return (
    <title>
      {pageName} | {NAMES.COMPANY}
    </title>
  )
}
