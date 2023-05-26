import { Radio, RadioGroup, Span } from '@/components'
import { Box, Button, Grid, Typography, formLabelClasses } from '@mui/material'

const styles = {
  // *** only use this if I decide to make it into a <form> (where `required` serves a purpose)
  'radio-group-label': {
    ['& .' + formLabelClasses.asterisk]: {
      display: 'none', // size is required and this is obvious. Better UX is to remove asterisk from UI
    },
  },

  'radio-group': {
    gap: 1.5,
  },

  'radio-label': {
    margin: 0, // remove default margin from individual radio labels
  },

  'radio-box': {
    padding: 0, // remove default padding and border-radius from <input:radio>'s <span> wrapper
    borderRadius: 0,
  },

  'radio-icon': {
    // normalise padding and font-size on icon, since it will flip between an outlined <Button> and a contained <Button>, which natively have different padding and font-size applied.
    p: '10px 16px',
    fontSize: { md: '1rem', sm: '0.95rem', xs: '0.9rem' },
  },
}

const defaultSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'] // JFN

export const ProductSizing = ({
  sizes = defaultSizes,
  value: checkedSize,
  hasErr,
  handleChange,
}) => {
  return (
    <Grid container direction="column" rowGap={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Select your size: <Span fontWeight={500} children={checkedSize} />
        </Typography>
        <Typography variant="body2" color="text.secondary" children="Size Guide?" />
      </Grid>
      {/* *** if wrapping and only 1 on second line, radio produces layout shift when clicked. Debug later */}
      <RadioGroup
        row
        sx={styles['radio-group']}
        name="size"
        value={checkedSize}
        onChange={handleChange}
        error={hasErr}
        FormLabelProps={{
          sx: styles['radio-group-label'],
        }}
        FormHelperTextProps={{
          children: hasErr ? 'Please select a size' : '',
          sx: { typography: 'body2', mt: 1, fontWeight: 500 },
        }}>
        {sizes.map((size) => (
          <SizeRadio key={size} size={size} />
        ))}
      </RadioGroup>
      <Box>
        <Typography variant="body2" children="Size Missing?" fontWeight={500} />
        <Typography
          variant="body2"
          children="Sign up to be notified when the product comes back in stock" // Add "Notify Me 🔔" link or button
        />
      </Box>
    </Grid>
  )
}

const SizeRadio = ({ size }) => {
  return (
    <Radio
      value={size}
      // disabled={...} // add later - will disable actual <input:radio>
      sx={styles['radio-label']}
      RadioProps={{
        sx: styles['radio-box'],
        // don't think specifying two custom icons for non-checked and checked status is best, but JFN
        icon: (
          <RadioIcon
            variant="outlined"
            children={size}
            // disabled={...} // add later - applies disabled styling to the <span>
          />
        ),
        checkedIcon: <RadioIcon variant="contained" children={size} disableElevation />,
      }}
    />
  )
}

const RadioIcon = (props) => {
  return <Button component="span" sx={styles['radio-icon']} {...props} />
}
