import { Radio, RadioGroup, Span } from '@/components'
import { Box, Typography, formLabelClasses, ButtonBase, Grid } from '@mui/material'
import { useState } from 'react'

const styles = {
  'radio-group-label': {
    ['& .' + formLabelClasses.asterisk]: {
      display: 'none', // color is required and this is obvious. Better UX is to remove asterisk from UI
    },
  },

  'radio-group': {
    gap: 2,
    mb: '2px', // bit hacky, but <RadioGroup> is quite domineering. Just a little bit more space underneath it
  },

  'radio-label': {
    margin: 0, // remove default margin from individual radio labels
  },

  'radio-box': {
    padding: 0, // remove default padding from <input:radio>'s <span> wrapper
  },

  'radio-icon': ({ color, checked }) => ({
    // typography: 'h3', - was very hit/miss
    fontSize: 36,
    height: '1em',
    width: '1em',
    bgcolor: color,
    borderRadius: '50%',
    border: '3px solid',
    borderColor: 'background.default',
    outline: '2px solid transparent',

    ...(checked && {
      outlineColor: (theme) => theme.palette.secondary.main, // isn't theme aware so can't write shorthand
    }),
  }),

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
      {/* should probably be provided as `label` prop to <RadioGroup>. Revisit *** */}
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
  const cssColor = color.toLowerCase().replace(/ /g, '')

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

const RadioIcon = (props) => {
  return <ButtonBase component="span" sx={styles['radio-icon'](props)} />
}
