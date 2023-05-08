import { useRef } from 'react'
import { Box, IconButton, useMediaQuery } from '@mui/material'

import { breakpoints, isVPMinMd } from '@/theme'

import { ProductPreviewCard } from '../ProductPreviewCard'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { SwiperBackIcon, SwiperForwardIcon } from '@/components'

import { latestProducts } from '@/data'

const styles = {
  'buttons-box': {
    width: 'fit-content',
    marginLeft: 'auto',
  },
}

// stackoverflow original code: https://stackoverflow.com/a/71225996. I haven't encountered bug yet, so I've removed useCallback etc.
export const ProductPreviewSwiper = () => {
  const isMinMd = useMediaQuery(isVPMinMd)

  const swiperRef = useRef(null)

  const goBack = () => swiperRef.current.swiper.slidePrev()
  const goForward = () => swiperRef.current.swiper.slideNext()

  return (
    <Box>
      {isMinMd && (
        <Box sx={styles['buttons-box']}>
          <IconButton
            onClick={goBack}
            children={<SwiperBackIcon />}
            aria-label="Go to next slide"
          />
          <IconButton
            onClick={goForward}
            children={<SwiperForwardIcon />}
            aria-label="Go to previous slide"
          />
        </Box>
      )}
      <Swiper
        ref={swiperRef}
        speed={800}
        breakpoints={{
          [breakpoints.values.xs]: { slidesPerView: 1.1 },
          [breakpoints.values.sm]: { slidesPerView: 2.1 },
          [breakpoints.values.md]: { slidesPerView: 3 },
          [breakpoints.values.lg]: { slidesPerView: 4 },
        }}>
        {latestProducts.map((product) => (
          <SwiperSlide key={product.name}>
            <Box py={2} px={1}>
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
