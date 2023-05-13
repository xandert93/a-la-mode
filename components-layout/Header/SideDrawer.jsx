import { categories } from '@/data'
import { ListItemText, MenuItem, MenuList, SwipeableDrawer } from '@mui/material'

const styles = {
  menu: {
    width: { xs: '80vw', sm: 320 }, // JFN - what's best practice, though? 🤔
  },
}

export const SideDrawer = ({ isOpen, toggle }) => {
  return (
    <SwipeableDrawer anchor="left" open={isOpen} onClose={toggle}>
      <MenuList onClick={toggle} sx={styles.menu}>
        {categories.map((category) => (
          <MenuItem key={category}>
            <ListItemText>{category}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </SwipeableDrawer>
  )
}
