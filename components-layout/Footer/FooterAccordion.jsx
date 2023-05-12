import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { FooterHeading } from './FooterHeading'

const styles = {
  root: {
    color: 'inherit',
    backgroundColor: 'transparent',
    '&:before': {
      display: 'none', // https://stackoverflow.com/questions/63488140/how-can-i-remove-line-above-the-accordion-of-material-ui
    },
  },

  summary: {
    borderBottom: '2px solid',
    borderColor: 'primary.light',
    p: 0,
    mb: 1,
    minHeight: 'initial', // 48px*
    '& .MuiAccordionSummary-content': {
      my: 1, // 1.5*
    },
  },

  details: {
    p: 0, // 8px 16px 16px
    ml: -1, // to account for `px:1` on <Link>
  },
}

// inherits from <Paper>, so `square` and `elevation` also available
export const FooterAccordion = ({ title, children }) => {
  return (
    <Accordion disableGutters square elevation={0} sx={styles.root}>
      <AccordionSummary expandIcon={<ExpandMore />} sx={styles.summary}>
        <FooterHeading children={title} />
      </AccordionSummary>
      <AccordionDetails sx={styles.details}>{children}</AccordionDetails>
    </Accordion>
  )
}
