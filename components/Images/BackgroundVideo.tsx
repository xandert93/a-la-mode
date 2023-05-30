import { Box, BoxProps, Theme } from '@mui/material'

const styles = {
  root: (theme: Theme) => ({
    ...theme.mixins.absCover,
    zIndex: -1,
  }),

  video: (theme: Theme) => theme.mixins.coverImage,
}

type Props = {
  posterSrc: string
  videoSrc: string
} & BoxProps

export const BackgroundVideo = ({ sx, posterSrc, videoSrc, ...props }: Props) => {
  return (
    <Box sx={Object.assign(styles.root, sx)} {...props}>
      <Box component="video" poster={posterSrc} sx={styles.video} autoPlay muted loop>
        <source src={videoSrc} />
        Your Browser is not supported.
      </Box>
    </Box>
  )
}
