import { useState } from 'react'

import { TextField, Typography, Grid, accordionSummaryClasses } from '@mui/material'
import { Accordion, Form, LoadingButton, ValidateIcon } from '@/components'

import { wait } from '@/utils/helpers'

const styles = {
  '&:before': {
    display: 'none', // https://stackoverflow.com/questions/63488140/how-can-i-remove-line-above-the-accordion-of-material-ui
  },

  [`& .${accordionSummaryClasses.content}`]: {
    justifyContent: 'center', // center title
  },

  button: {
    p: 0, // makes same size as <TextField>
  },
}

export const PromotionCodeAccordion = () => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    try {
      setMessage('')
      setIsVerifying(true)
      await wait(1.5)
      throw new Error('Code not recognised')
      setIsVerified(true)
      // apply code to bill etc.
    } catch (err) {
      setMessage(err.message)
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Accordion
      disableGutters
      elevation={0}
      title={<Typography variant="body2" children="Do you have a promotion code?" />}
      sx={styles}>
      <Grid component={Form} container wrap="nowrap" columnGap={1} pt={2} onSubmit={handleSubmit}>
        <TextField label="Code" size="small" />
        <LoadingButton
          type="submit"
          children={<ValidateIcon />}
          disableElevation
          isLoading={isVerifying}
          disabled={isVerified}
          sx={styles.button}
        />
      </Grid>
      {message && (
        <Typography
          variant="body2"
          children={message}
          color={isVerified ? 'success.main' : 'error.main'}
          align="center"
          mt={2}
        />
      )}
    </Accordion>
  )
}
