import { List, ListItem, Typography, useMediaQuery } from '@mui/material'

import { TextLink } from '@/components'
import { isHoverable, isVPXs } from '@/theming'

import { FooterAccordion } from './FooterAccordion'
import { FooterHeading } from './FooterHeading'

const data = {
  'Customer Care': [
    { href: '/#', children: 'Help & FAQs' },
    { href: '/#', children: 'Delivery & Returns' },
    { href: '/#', children: 'Track My Order' },
    { href: '/#', children: 'Accessibility' },
    { href: '/#', children: 'Terms & Conditions' },
  ],
  Corporate: [
    { href: '/#', children: 'Careers' },
    { href: '/#', children: 'News Room' },
    { href: '/#', children: 'Corporate Responsibility' },
    { href: '/#', children: 'Investors' },
  ],
  'More from Á la Mode': [
    { href: '/#', children: 'Gift Vouchers' },
    { href: '/#', children: 'News Room' },
    { href: '/#', children: 'Sustainability' },
    { href: '/#', children: 'Refer a Friend' },
  ],
}

const styles = {
  link: {
    [isHoverable]: {
      ':hover': {
        color: 'primary.light',
      },
    },
  },
}

// *** probably more efficient way of doing this
export const FooterLinks = ({ title }) => {
  const isXs = useMediaQuery(isVPXs)

  const links = data[title]

  if (isXs)
    return (
      <FooterAccordion title={<FooterHeading children={title} />}>
        <FooterNavigation links={links} />
      </FooterAccordion>
    )
  else
    return (
      <>
        <FooterHeading children={title} pl={1} paragraph />
        <FooterNavigation links={links} />
      </>
    )
}

const FooterNavigation = ({ links }) => {
  return (
    <nav>
      <List disablePadding>
        {links.map((props, index) => (
          <ListItem key={index} disablePadding>
            <Typography variant="body2" sx={styles.link} component={TextLink} {...props} />
          </ListItem>
        ))}
      </List>
    </nav>
  )
}
