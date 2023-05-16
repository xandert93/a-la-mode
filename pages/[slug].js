import {
  HeartIcon,
  HeartIconOutlined,
  IconButton,
  LoadingButton,
  OutlinedButton,
  Section,
  SectionHeading,
} from '@/components'
import { newProducts, popularProducts } from '@/data'
import { useToggle } from '@/hooks'
import { wait } from '@/utils/helpers'
import { Favorite, FavoriteBorder, HeartBroken, MoreHoriz } from '@mui/icons-material'
import {
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

export default function ProductPage(data) {
  return <ProductReviewsSection />
}

const productReviews = [
  {
    _id: 1,
    name: 'Carlos Vela',
    rating: 5,
    title: 'WOULD DEFINITELY GO FOR ONE SIZE SMALLER',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, non.',
    createdAt: '2 months ago',
  },
  {
    _id: 2,
    name: 'Kenny James',
    rating: 4,
    title: 'VERY RELAXED FIT, PERFECT FOR DAILY USE',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, odio hic. Ex, harum. Voluptates beatae illo nam eos, sapiente a impedit facilis quidem, architecto iure, ullam obcaecati porro in. Distinctio deserunt magni, ab quod quos illum corrupti! Aliquam libero magni esse iste voluptates accusantium consequuntur repellat incidunt facilis commodi! Assumenda?',
    createdAt: '5 months ago',
  },
  {
    _id: 3,
    name: 'Mike Dingbat',
    rating: 5,
    title: 'EXCELLENT DESIGN , VERY COMFY AND STYLISH',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis mollitia iste ducimus dolore excepturi dicta a aut voluptates natus deserunt, nam vitae assumenda commodi eligendi cumque perferendis similique reprehenderit?',
    createdAt: 'Last year',
  },
  {
    _id: 4,
    name: 'Wang Dong',
    rating: 4,
    title: 'CLASSIC FIT AND HIGH QUALITY.',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis mollitia iste ducimus dolore excepturi dicta a aut voluptates natus deserunt, nam vitae assumenda commodi eligendi cumque perferendis similique reprehenderit?',
    createdAt: '2 years ago',
  },
  {
    _id: 5,
    name: 'Kevin Spacey',
    rating: 4,
    title: 'LIKE IT BUT THE SIZES ARE NOT CONSISTENT TO CHART',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis mollitia iste ducimus dolore excepturi dicta a aut voluptates natus deserunt, nam vitae assumenda commodi eligendi cumque perferendis similique reprehenderit?',
    createdAt: '4 years ago',
  },
]

const ProductReviewsSection = () => {
  const reviewCount = productReviews.length

  const avgRating =
    productReviews.reduce((acca, review) => {
      return acca + review.rating
    }, 0) / reviewCount

  return (
    <Section maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
      <Grid container direction="column" alignItems={{ xs: 'center', sm: 'start' }} rowGap={1}>
        <SectionHeading children="Reviews" />
        <Grid container width="initial" alignItems="center" columnGap={1}>
          <Rating value={avgRating} precision={0.5} size="large" />
          <Typography
            component="p"
            variant="h5"
            lineHeight={0}
            fontWeight={600}
            children={avgRating}
          />
          <Typography children={`(${reviewCount} Reviews)`} />
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          children="100% of customers recommend this product"
        />
        <Grid container direction="column-reverse">
          {[0, 1, 3, 23, 73].map((percentage, index) => (
            <RatingBar key={index} starCount={index + 1} percentage={percentage} />
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <OutlinedButton
            href=""
            children="Write a Review"
            fullWidth
            sx={{
              p: '13.5px', // hacky but to match <Select> size JFN
            }}
          />
        </Grid>
        {/* 👇 See Macys */}
        <Grid item xs={12} sm={6}>
          <TextField select label="Sort by" value={1}>
            <MenuItem value={1} children="Newest" />
            <MenuItem value={2} children="Oldest" />
            <MenuItem value={3} children="Highest Rating" />
            <MenuItem value={4} children="Lowest Rating" />
            <MenuItem value={5} children="Photos" />
          </TextField>
        </Grid>
      </Grid>

      <Grid container rowGap={2}>
        {productReviews.map((review) => (
          <ProductReview key={review._id} {...review} />
        ))}
      </Grid>
    </Section>
  )
}

const RatingBar = ({ starCount, percentage }) => {
  return (
    <Grid container alignItems="center" columnGap={1.5}>
      <Rating value={starCount} sx={{ fontSize: { xs: 16, sm: 20, md: 24, lg: 28 } }} />
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ height: { xs: 12, sm: 16 }, borderRadius: 0.5, flexGrow: 1 }}
      />
      <Typography
        children={`(100)`}
        minWidth={'3ch'} // hacky JFN - not gonna work when one is 1000 and another is 1
      />
    </Grid>
  )
}

const ProductReview = ({ name, rating, title, text, createdAt }) => {
  return (
    <Grid container rowSpacing={{ xs: 0.5, sm: 1 }} alignItems="center">
      <Grid item xs>
        <Typography children={name} fontWeight={500} />
      </Grid>
      <Grid item>
        <MoreButton />
      </Grid>
      <Grid item xs={12} container alignItems="center" columnGap={1}>
        <Rating
          value={rating}
          precision={0.5}
          sx={{ fontSize: { xs: 16, sm: 20, md: 24, lg: 28 } }}
        />
        <Typography
          variant="caption" // JFN - too small for sm+
          lineHeight={1}
          color="text.secondary"
          children={createdAt}
        />
      </Grid>
      <Grid item>
        <Typography
          sx={{
            typography: {
              xs: 'body2',
              sm: 'body1', // xs version of body1 was still too big
            },
          }}
          children={text}
        />
      </Grid>
    </Grid>
  )
}

const MoreButton = () => {
  const buttonElRef = useRef()

  const [isPopperOpen, togglePopper] = useToggle()

  const closePopper = () => togglePopper(false)

  return (
    <>
      <IconButton
        ref={buttonElRef}
        onClick={togglePopper}
        sx={{ p: { xs: 0, sm: 0.5 } }}
        children={<MoreHoriz />}
      />

      <MoreButtonPopper
        open={isPopperOpen}
        anchorEl={buttonElRef.current}
        handleClose={closePopper}
      />
    </>
  )
}

const MoreButtonPopper = ({ handleClose, ...props }) => {
  return (
    <Popper {...props} placement="bottom-end" transition>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Card elevation={4} sx={{ p: 1, mt: 0.5 }}>
            <ClickAwayListener onClickAway={handleClose}>
              <Typography children="Report" />
            </ClickAwayListener>
          </Card>
        </Grow>
      )}
    </Popper>
  )
}

/*
- Macy's is traditional (copied for now). But Asos (shows most recent review) & M&S (shows none) both have "View All Reviews" button at bottom. When clicked, opens sidedrawer of reviews.
- I like Udemy mobile app "Buy Now" button when scrolling through comments - means user doesn't have to scroll up after to buy. Handy UX 
- could include "Helpful? 👍/👎" under each review on md+
- could allow image upload for review

- In review form, include a "Would you recommend this product 👍/👎" and then display on each review or the percentage of reviews that recommended product

*/
