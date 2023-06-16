import { Section } from '@/components'
import { isVPXsAndPortrait } from '@/theme'

const styles = {
  root: {
    minHeight: '50vh',

    [isVPXsAndPortrait]: {
      minHeight: 'calc(100vh - 90px)', // ❗ 🚧 - but find dynamic approach
    },

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    rowGap: 4,

    p: 4,
  },

  icon: {
    fontSize: 50,
  },
}

export const EmptyItemsSection = ({ Icon, children, ...props }) => {
  return (
    <Section maxWidth="sm" sx={styles.root} {...props}>
      <Icon color="primary" sx={styles.icon} />
      {children}
    </Section>
  )
}
