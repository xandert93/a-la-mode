import { IconButton } from '@mui/material'

import { SearchIcon } from '@/components'
import { useToggle } from '@/hooks'

import { MobileHeaderSearchBar } from './MobileHeaderSearchBar'

export const MobileHeaderSearchButton = () => {
  const [isOpen, toggleSearch] = useToggle()

  return (
    <>
      <IconButton onClick={toggleSearch} children={<SearchIcon />} />
      {/* temporarily placing 👇 here to isolate logic. Semantically, not ideal though */}
      {isOpen && <MobileHeaderSearchBar close={toggleSearch} />}
    </>
  )
}
