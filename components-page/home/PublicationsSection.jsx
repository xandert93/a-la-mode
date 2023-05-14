import { publications } from '@/data'
import { LogosSection } from './LogosSection'

const styles = {
  root: {
    mt: { xs: 4, sm: 5 }, // since <HomeHeroSection> has padding-bottom already
    mb: { xs: 6, sm: 7 },
  },
}

export const PublicationsSection = () => {
  return <LogosSection data={publications} title="As featured in" sx={styles.root} />
}
