import {
  Accordion as MuiAccordion,
  AccordionSummary as Title,
  AccordionDetails as Details,
} from '@mui/material'
import { AccordionOpenIcon as OpenIcon } from '../index'

export const Accordion = ({ title, titleProps, children, ...props }) => {
  return (
    <MuiAccordion {...props}>
      <Title children={title} expandIcon={<OpenIcon />} />
      <Details children={children} />
    </MuiAccordion>
  )
}
