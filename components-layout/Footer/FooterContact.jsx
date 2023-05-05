import { EmailIcon, LocationIcon, TelephoneIcon } from '@/components'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

export const FooterContact = () => {
  return (
    <>
      <Typography variant="h6" children="Contact Us" />
      <List disablePadding>
        <ListItem>
          <ListItemIcon children={<LocationIcon />} />
          <ListItemText primary="60 Av. Montaigne, 75008 Paris" />
        </ListItem>
        <ListItem>
          <ListItemIcon children={<TelephoneIcon />} />
          <ListItemText primary="+33 1 56 69 80 80" />
        </ListItem>
        <ListItem>
          <ListItemIcon children={<EmailIcon />} />
          <ListItemText primary="support@alamode.fr" />
        </ListItem>
      </List>
    </>
  )
}

/*
  🔥 1) <ListItem> wrapper effectively adds { padding: '4px 0px'} to <li> and some other neglible stuff (inspect DevTools if need be)
  */
