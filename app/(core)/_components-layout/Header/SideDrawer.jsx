import { categories } from '@/data'
import { ListItemText, MenuItem, MenuList, SwipeableDrawer } from '@mui/material'

const styles = {
  menu: {
    width: { xs: '80vw', sm: 320 }, // ❗ 🚧 - what's best practice, though? 🤔
  },
}

export const SideDrawer = ({ isOpen, toggle }) => {
  return (
    <SwipeableDrawer anchor="left" open={isOpen} onClose={toggle} onOpen={toggle}>
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

/*
🔥 If the drawer is closed, onOpen will fire if client swipes from the anchor side (requesting to open the drawer)
*/
