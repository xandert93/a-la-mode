import { Close } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar as ToolBar } from '@mui/material'
import { MobileHeaderSearchForm } from './MobileHeaderSearchForm'

const styles = {
  appBar: {
    top: 36, //*** hardcoded for now to account for <PromotionBanner>
  },
  toolBar: {
    columnGap: 1,
  },
}

export const MobileHeaderSearchBar = ({ close }) => {
  return (
    <AppBar
      component="div"
      position="fixed"
      elevation={0} // otherwise adds additional box-shadow on top of <Header>'s
      sx={styles.appBar}>
      <ToolBar sx={styles.toolBar}>
        <IconButton onClick={close} children={<Close />} />
        <MobileHeaderSearchForm />
      </ToolBar>
    </AppBar>
  )
}
