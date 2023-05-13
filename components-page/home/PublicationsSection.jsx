import { publications } from '@/data'
import { LogosSection } from './LogosSection'

const styles = {
  root: {
    mt: 6, // since <HomeHeroSection> has padding-bottom already
    mb: 8,
  },
}

export const PublicationsSection = () => {
  return <LogosSection data={publications} title="As featured in" sx={styles.root} />
}
