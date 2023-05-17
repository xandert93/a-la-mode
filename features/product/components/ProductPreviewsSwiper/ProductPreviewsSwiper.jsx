import { useRef } from 'react'
import { Box, useMediaQuery, Grid } from '@mui/material'

import { breakpoints, isVPMinMd } from '@/theming'

import { ProductPreviewCard } from '../ProductPreviewCard'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import {
  SectionSubHeading,
  SectionHeading,
  ArrowLeftIcon,
  ArrowRightIcon,
  IconButton,
} from '@/components'

const styles = {
  arrow: {
    fontSize: { xl: 40, lg: 36, md: 32 },
  },
}

export const ProductPreviewsSwiper = ({ type, title, products }) => {
  const isMinMd = useMediaQuery(isVPMinMd)

  const swiperRef = useRef(null)

  const goBack = () => swiperRef.current.swiper.slidePrev()
  const goForward = () => swiperRef.current.swiper.slideNext()

  return (
    <Box>
      <SectionSubHeading children={type} />
      <Grid container justifyContent="space-between" alignItems="center">
        <SectionHeading children={title} />
        {isMinMd && (
          <Grid container columnGap={1} width="fit-content">
            <IconButton
              onClick={goBack}
              children={<ArrowLeftIcon sx={styles.arrow} />}
              aria-label="Go to next slide"
            />
            <IconButton
              onClick={goForward}
              children={<ArrowRightIcon sx={styles.arrow} />}
              aria-label="Go to previous slide"
            />
          </Grid>
        )}
      </Grid>

      <Swiper
        ref={swiperRef}
        speed={800}
        breakpoints={{
          [breakpoints.values.xs]: { slidesPerView: 1.1 },
          [breakpoints.values.sm]: { slidesPerView: 2.1 },
          [breakpoints.values.md]: { slidesPerView: 3 },
          [breakpoints.values.lg]: { slidesPerView: 4 },
        }}>
        {products.map((product) => (
          <SwiperSlide key={product.name}>
            <Box py={2} px={0.5}>
              <ProductPreviewCard {...product} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

/* additional props I'm not passing JFN:

     direction of swiper:
       direction="horizontal" // default 

     provide additional Swiper modules which need to be name imported from 'swiper' along with their stylesheets e.g.:

       import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
       import 'swiper/css/navigation'
       import 'swiper/css/pagination'
       import 'swiper/css/scrollbar'

       and then pass the following prop:

      modules={[Navigation, Pagination, Scrollbar, A11y]}

     horizontal scrollbar beneath Swiper:
       scrollbar={isMinMd && { draggable: true }}
     
     slide indicators:
       pagination={isMinMd && { clickable: true }}

     margin between <SwiperSlide>s (also applicable to individual breakpoints):
     spaceBetween=Number (px)
*/
