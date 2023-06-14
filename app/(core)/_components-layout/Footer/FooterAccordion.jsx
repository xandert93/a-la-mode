import { accordionDetailsClasses, accordionSummaryClasses } from '@mui/material'
import { Accordion } from '@/components'

const styles = {
  '&:before': {
    display: 'none', // https://stackoverflow.com/questions/63488140/how-can-i-remove-line-above-the-accordion-of-material-ui
  },

  [`& .${accordionSummaryClasses.root}`]: {
    borderBottom: '2px solid',
    borderColor: 'primary.light',
    mb: 1,
  },
  [`& .${accordionSummaryClasses.content}`]: {
    my: 1, // 1.5*
  },

  [`& .${accordionDetailsClasses.root}`]: {},
}

// inherits from <Paper>, so `square` and `elevation` also available
export const FooterAccordion = (props) => {
  return <Accordion disableGutters square elevation={0} {...props} sx={styles} />
}
