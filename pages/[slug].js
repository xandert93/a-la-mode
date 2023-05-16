import {
  HeartIcon,
  HeartIconOutlined,
  IconButton,
  LoadingButton,
  OutlinedButton,
  Section,
  SectionHeading,
} from '@/components'
import { ProductReviewsSection } from '@/components-page/product-detail'
import { newProducts, popularProducts } from '@/data'
import { useToggle } from '@/hooks'
import { wait } from '@/utils/helpers'
import { Favorite, FavoriteBorder, HeartBroken, MoreHoriz } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  ClickAwayListener,
  Grid,
  Grow,
  LinearProgress,
  MenuItem,
  Popper,
  Rating,
  TextField,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'

const productDb = [...popularProducts, ...newProducts]

// At build time, fetch valid slugs and give each to getStaticProps
// Next executes just once
export const getStaticPaths = () => {
  const paths = productDb.map((product) => {
    return { params: { slug: product.slug } }
  })

  return {
    fallback: false,
    paths,
  }
}

// Then fetch each matching product and give each to ProductPage
// Next executes for every path
export const getStaticProps = (context) => {
  const { slug } = context.params

  const product = productDb.find((product) => product.slug === slug)

  return { props: product }
}

// Next therefore creates HTML + JSON for every path
// export default function ProductPage(data) {
// const [isRequesting, setIsRequesting] = useState(false)
// const [isLiked, setIsLiked] = useState(false)

// const toggleSave = async () => {
//   setIsRequesting(true)
//   await wait(1)
//   setIsLiked((prev) => !prev)
//   setIsRequesting(false)
// }

// return (
//   <Box>
//     <p>BreadCrumbs - see MUI</p>
//     <Grid container>
//       <Button variant="contained">Add to Bag</Button>
//       <LoadingButton
//         variant="contained"
//         isLoading={isRequesting}
//         onClick={toggleSave}
//         endIcon={isLiked ? <HeartIcon /> : <HeartIconOutlined />}>
//         Add{isLiked && 'ed'} to Wish List
//       </LoadingButton>
//     </Grid>
//     <h2>Customers also loved</h2>
//     <h2>Reviews</h2>
//   </Box>
// )
// }

export default function ProductDetailPage(data) {
  return <ProductReviewsSection />
}
