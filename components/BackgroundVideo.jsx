import { Box } from '@mui/material'

const rootStyles = (theme) => ({
  ...theme.mixins.absCover,
  zIndex: -1,
})

const videoStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}

export const BackgroundVideo = ({ src }) => {
  return (
    <Box sx={rootStyles}>
      <video style={videoStyles} autoPlay muted loop>
        <source src={src} />
        Your Browser is not supported.
      </video>
    </Box>
  )
}