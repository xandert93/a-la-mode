import { Close } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar as ToolBar } from '@mui/material'
import { MobileHeaderSearchForm } from './MobileHeaderSearchForm'

const styles = {
  'app-bar': {
    top: 36, //*** hardcoded for now to account for <PromotionBanner>
  },
  'tool-bar': {
    columnGap: 1,
  },
}

export const MobileHeaderSearchBar = ({ close }) => {
  return (
    <AppBar
      component="div"
      position="fixed"
      elevation={0} // otherwise adds additional box-shadow on top of <Header>'s
      sx={styles['app-bar']}>
      <ToolBar sx={styles['tool-bar']}>
        <IconButton onClick={close} children={<Close />} aria-label="Close search" />
        <MobileHeaderSearchForm />
      </ToolBar>
    </AppBar>
  )
}
