import { NAMES } from '@/constants'

export const Title = ({ pageName }) => {
  return <title children={`${pageName} | ${NAMES.COMPANY}`} />
}
