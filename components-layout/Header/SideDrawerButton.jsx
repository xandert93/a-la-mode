import { IconButton } from '@mui/material'
import { MenuIcon } from '@/components'
import { SideDrawer } from './SideDrawer'

const { useToggle } = require('@/hooks')

export const SideDrawerButton = () => {
  const [isOpen, toggle] = useToggle()

  return (
    <>
      <IconButton onClick={toggle} children={<MenuIcon />} aria-label="Open side drawer" />
      {/* temporarily placing 👇 here to isolate logic. Semantically, not ideal though */}
      <SideDrawer isOpen={isOpen} toggle={toggle} />
    </>
  )
}
