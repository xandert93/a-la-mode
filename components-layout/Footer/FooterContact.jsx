import { EmailIcon, LocationIcon, TelephoneIcon } from '@/components'
import { List, ListItem, ListItemIcon, Typography } from '@mui/material'

import { FooterHeading } from './FooterHeading'

const styles = {
  heading: {
    paddingLeft: { sm: 1 }, // just to get in line with other <FooterHeading>s which have same styling applied
  },

  icon: {
    fontSize: 24,
  },
}

const data = {
  address: {
    Icon: LocationIcon,
    text: '60 Av. Montaigne, 75008 Paris',
  },
  telephone: {
    Icon: TelephoneIcon,
    text: '+33 1 56 69 80 80',
  },
  email: {
    Icon: EmailIcon,
    text: 'support@alamode.fr',
  },
}

export const FooterContact = () => {
  return (
    <>
      <FooterHeading children="Contact Us" sx={styles.heading} />
      <List>
        {Object.values(data).map(({ Icon, text }, index) => (
          <ListItem key={index}>
            <ListItemIcon children={<Icon sx={styles.icon} />} />
            <Typography variant="body2" children={text} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

/*
  🔥 1) <ListItem> wrapper effectively adds { padding: '4px 0px'} to <li> and some other neglible stuff (inspect DevTools if need be)
  */
