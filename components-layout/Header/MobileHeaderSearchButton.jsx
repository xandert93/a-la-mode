import { SearchIcon, IconButton } from '@/components'
import { useToggle } from '@/hooks'

import { MobileHeaderSearchBar } from './MobileHeaderSearchBar'

export const MobileHeaderSearchButton = () => {
  const [isOpen, toggleSearch] = useToggle()

  return (
    <>
      <IconButton onClick={toggleSearch} children={<SearchIcon />} aria-label="Open search" />
      {/* temporarily placing 👇 here to isolate logic. Semantically, not ideal though */}
      {isOpen && <MobileHeaderSearchBar close={toggleSearch} />}
    </>
  )
}
