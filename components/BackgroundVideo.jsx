import { Box } from '@mui/material'

const styles = {
  root: (theme) => ({
    ...theme.mixins.absCover,
    zIndex: -1,
  }),

  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}

export const BackgroundVideo = ({ sx, poster, src, ...props }) => {
  return (
    <Box sx={[styles.root, sx]} {...props}>
      <Box component="video" poster={poster} sx={styles.video} autoPlay muted loop>
        <source src={src} />
        Your Browser is not supported.
      </Box>
    </Box>
  )
}
