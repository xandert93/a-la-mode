import { Grid, useMediaQuery } from '@mui/material'

import { CompanyHeading, CompanyLogo, Link } from '@/components'
import { PATHS } from '@/constants'
import { isVPMaxMd, isVPMaxSm } from '@/theming'

import { SideDrawerButton } from './SideDrawerButton'

const styles = {
  link: {
    [isVPMaxMd]: {
      borderRadius: '50%',
    },
  },

  heading: {
    fontFamily: 'Ephesis, cursive',
    fontWeight: 400,
    letterSpacing: 1,
    display: { xs: 'none', lg: 'block' },
  },

  logo: {
    width: { xs: 40, sm: 48 },
  },
}

export const HeaderHeading = () => {
  const isMaxSm = useMediaQuery(isVPMaxSm)

  return (
    <Grid container alignItems="center" columnGap={{ xs: 1 }}>
      {isMaxSm && <SideDrawerButton />}
      <Link href={PATHS.HOME} underline="none" sx={styles.link}>
        <Grid container alignItems="center" columnGap={2}>
          <CompanyLogo sx={styles.logo} />
          <CompanyHeading variant="h4" sx={styles.heading} />
        </Grid>
      </Link>
    </Grid>
  )
}
