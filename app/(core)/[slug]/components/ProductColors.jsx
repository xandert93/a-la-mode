import { CircleIcon, Radio, RadioGroup, Span } from '@/components'
import { Typography, formLabelClasses, Grid } from '@mui/material'

const styles = {
  'radio-group-label': {
    ['& .' + formLabelClasses.asterisk]: {
      display: 'none', // color is required and this is obvious. Better UX is to remove asterisk from UI
    },
  },

  'radio-group': {
    gap: 2,
  },

  'radio-label': {
    margin: 0, // remove default margin from individual radio labels
  },

  'radio-box': {
    padding: 0, // remove default padding from <input:radio>'s <span> wrapper
  },

  'radio-helper-text': {
    typography: 'body2',
    mt: 1,
    fontWeight: 500,
  },
}

const defaultColors = ['Beige', 'Navy', 'Powder Blue', 'Dark Slate Gray', 'Navajo White'] // CSS color keywords (in title case with white spaces). Intentional for use in UI!

export const ProductColors = ({
  colors = defaultColors,
  value: checkedColor,
  hasErr,
  handleChange,
}) => {
  return (
    <Grid container direction="column" rowGap={2}>
      {/* ❗ should probably be provided as `label` prop to <RadioGroup> */}
      <Typography variant="body2">
        Select your color: <Span fontWeight={500} children={checkedColor} />
      </Typography>
      <RadioGroup
        row
        sx={styles['radio-group']}
        name="color"
        value={checkedColor}
        onChange={handleChange}
        error={hasErr}
        FormLabelProps={{
          sx: styles['radio-group-label'],
        }}
        FormHelperTextProps={{
          children: hasErr ? 'Please select a color' : '',
          sx: styles['radio-helper-text'],
        }}>
        {colors.map((color) => (
          <ColorRadio key={color} color={color} />
        ))}
      </RadioGroup>
    </Grid>
  )
}

// add disabled for <Radio> and <RadioIcon> later once I've figured colors out
const ColorRadio = ({ color }) => {
  const cssColor = color.replace(/ /g, '')

  return (
    <Radio
      value={color}
      sx={styles['radio-label']}
      RadioProps={{
        sx: styles['radio-box'],
        icon: <RadioIcon color={cssColor} />,
        checkedIcon: <RadioIcon color={cssColor} checked />,
      }}
    />
  )
}

const RadioIcon = ({ color, checked }) => {
  return (
    <CircleIcon
      sx={{
        color,
        // typography: 'h3', // very hit/miss
        fontSize: 36,
        borderRadius: '50%',
        ...(checked && {
          border: checked && '2px outset',
          borderColor: 'secondary.main',
        }),
      }}
    />
  )
}
