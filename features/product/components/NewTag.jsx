import { Paper, Typography } from '@mui/material'

// May have different tags too e.g. 'Best Seller'... one to potentially revisit
export const NewTag = () => {
  return (
    <Paper
      elevation={2}
      sx={{ bgcolor: 'text.primary', color: 'background.default', py: 0.5, px: 1 }}>
      <Typography variant="caption" component="p" children="New" />
    </Paper>
  )
}
