import { List, ListItem, Typography, useMediaQuery } from '@mui/material'
import { FooterAccordion } from './FooterAccordion'
import { isVPXs } from '@/theme'
import { Link } from '@/components'

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
    { href: '/#', children: 'Sustainability' },
    { href: '/#', children: 'Investors' },
  ],
}

// *** probably more efficient way of doing this
export const FooterLinks = ({ title }) => {
  const isXs = useMediaQuery(isVPXs)

  const links = data[title]

  if (isXs)
    return (
      <FooterAccordion title={title}>
        <FooterNavigation links={links} />
      </FooterAccordion>
    )
  else
    return (
      <>
        <Typography component="h2" variant="h6" children={title} />
        <FooterNavigation links={links} />
      </>
    )
}

const FooterNavigation = ({ links }) => {
  return (
    <nav>
      <List dense disablePadding>
        {links.map((props, index) => (
          <ListItem key={index} children={<Link {...props} />} />
        ))}
      </List>
    </nav>
  )
}
