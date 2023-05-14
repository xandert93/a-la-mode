import { Link } from './Link'

const styles = {
  px: 1,
  py: 0.5,
  borderRadius: 1,
}

export const TextLink = ({ sx, ...props }) => {
  return <Link sx={styles} {...props} />
}
