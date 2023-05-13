import { brands } from '@/data'
import { LogosSection } from './LogosSection'

const styles = {
  root: {
    my: { xs: 7, sm: 8 },
  },
}

export const BrandsSection = () => {
  return <LogosSection data={brands} title="Brands you will love" sx={styles.root} />
}
