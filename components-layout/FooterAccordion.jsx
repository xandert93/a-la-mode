import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'

const styles = {
  root: {
    '&:before': {
      display: 'none', // https://stackoverflow.com/questions/63488140/how-can-i-remove-line-above-the-accordion-of-material-ui
    },
  },

  summary: {
    borderBottom: '2px solid beige',
    p: 0,
    mb: 1,
    minHeight: 'initial',
    '& .MuiAccordionSummary-content': {
      margin: '8px 0',
    },
  },

  details: {
    padding: 0, // 8px 16px 16px
  },
}

// inherits from <Paper>, so `square` and `elevation` also available
export const FooterAccordion = ({ title, children }) => {
  return (
    <Accordion disableGutters square elevation={0} sx={styles.root}>
      <AccordionSummary expandIcon={<ExpandMore />} sx={styles.summary}>
        <Typography variant="h6" component="h3" children={title} />
      </AccordionSummary>
      <AccordionDetails sx={styles.details}>{children}</AccordionDetails>
    </Accordion>
  )
}
