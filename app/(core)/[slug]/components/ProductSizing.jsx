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

// *** add disabled to BOTH <Radio> (disable actual <input:radio>) and <RadioIcon> (applies disabled styling to the <span>)
// *** Also, I don't think specifying two custom icons for non-checked and checked status is best, but JFN. It's how MUI does it so... 🤷‍♀️
const SizeRadio = ({ size }) => {
  return (
    <Radio
      value={size}
      sx={styles['radio-label']}
      RadioProps={{
        sx: styles['radio-box'],
        icon: <RadioIcon children={size} />,
        checkedIcon: <RadioIcon children={size} checked />,
      }}
    />
  )
}

const RadioIcon = ({ checked, ...props }) => {
  const styles = {
    py: 1.5,
    px: 2,

    ...(checked && {
      // simulated contained styling (actual contained styling was producing unpredictable 0.5px height change 🤷‍♀️)
      color: 'background.default',
      bgcolor: 'secondary.main',
      fontWeight: 500,
    }),
  }

  return <Button component="span" variant="outlined" color="secondary" sx={styles} {...props} />
}
