import { isVPMinMd } from '@/theme'

import {
  AppBar,
  Grid,
  Slide,
  Toolbar as ToolBar,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material'

import { PromotionBanner } from '../PromotionBanner'
import { HeaderHeading } from './HeaderHeading'
import { HeaderNav } from './HeaderNav'
import { HeaderActions } from './HeaderActions'

export const Header = () => {
  const isScrolledDown = useScrollTrigger({ threshold: 100 })
  const isMinMd = useMediaQuery(isVPMinMd)

  return (
    <Slide appear={false} in={!isScrolledDown} timeout={{ enter: 250, exit: 500 }}>
      <AppBar position="sticky" elevation={8}>
        <PromotionBanner />
        <ToolBar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item md={3.5}>
              <HeaderHeading />
            </Grid>
            {isMinMd && (
              <Grid item md={5}>
                <HeaderNav />
              </Grid>
            )}
            <Grid item md={3.5}>
              <HeaderActions />
            </Grid>
          </Grid>
        </ToolBar>
      </AppBar>
    </Slide>
  )
}
