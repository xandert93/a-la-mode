import { categories } from '@/data'
import { ListItemText, MenuItem, MenuList, SwipeableDrawer } from '@mui/material'

export const SideDrawer = ({ isOpen, toggle }) => {
  return (
    <SwipeableDrawer anchor="left" open={isOpen} onClose={toggle}>
      <MenuList onClick={toggle}>
        {categories.map((category) => (
          <MenuItem key={category}>
            <ListItemText>{category}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </SwipeableDrawer>
  )
}
