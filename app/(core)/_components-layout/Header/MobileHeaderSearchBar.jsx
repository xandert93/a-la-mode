import { AppBar as Appbar, IconButton, Toolbar as ToolBar } from '@mui/material'
import { MobileHeaderSearchForm } from './MobileHeaderSearchForm'

import { CloseIcon } from '@/components'

const styles = {
  appbar: {
    top: 36, //❗ hardcoded for now to account for <PromotionBanner>
  },
  toolbar: {
    columnGap: 1,
  },
}

export const MobileHeaderSearchBar = ({ close }) => {
  return (
    <Appbar
      component="div"
      position="fixed"
      elevation={0} // otherwise adds additional box-shadow on top of <Header>'s
      sx={styles.appbar}>
      <ToolBar sx={styles.toolbar}>
        <IconButton onClick={close} children={<CloseIcon />} aria-label="Close search" />
        <MobileHeaderSearchForm />
      </ToolBar>
    </Appbar>
  )
}
