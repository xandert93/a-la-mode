import { useEffect, useState } from 'react'
import { Box, Fade, Typography } from '@mui/material'

import { promotions } from '@/data'

const styles = {
  root: {
    backgroundColor: 'background.highlight',
    textAlign: 'center',
    letterSpacing: 1,
  },
}

export const PromotionBanner = () => {
  const [index, setIndex] = useState(0)

  const updatePromo = () => {
    setIndex((prev) => {
      const isLast = prev === promotions.length - 1
      return isLast ? 0 : prev + 1
    })
  }

  useEffect(() => {
    const intervalId = setInterval(updatePromo, 8000)

    /// only since React 18's "strict mode" mounts, unmounts, mounts every component:
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Box p={1} sx={styles.root}>
      <Fade key={index} in timeout={1200}>
        <Typography variant="body2" children={promotions[index].title} />
      </Fade>
    </Box>
  )
}
