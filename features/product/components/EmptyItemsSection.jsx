import { Section } from '@/components'
import { isVPXsAndPortrait } from '@/theming'
import { forwardRef } from 'react'

const styles = {
  root: {
    minHeight: '50vh',

    [isVPXsAndPortrait]: {
      minHeight: 'calc(100vh - 90px)', // *** JFN - but find dynamic approach
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

export const EmptyItemsSection = forwardRef(({ Icon, children, ...props }, ref) => {
  return (
    <Section maxWidth="sm" sx={styles.root} {...props} ref={ref}>
      <Icon color="primary" sx={styles.icon} />
      {children}
    </Section>
  )
})
