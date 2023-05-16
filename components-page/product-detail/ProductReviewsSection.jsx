import { IconButton, Section, SectionHeading, Select } from '@/components'
import { productReviews } from '@/data'
import { useToggle } from '@/hooks'
import { MoreHoriz } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Card,
  ClickAwayListener,
  Grid,
  Grow,
  LinearProgress,
  MenuItem,
  Popper,
  Rating,
  Typography,
} from '@mui/material'
import { useRef } from 'react'

export const ProductReviewsSection = () => {
  const reviewCount = productReviews.length

  const avgRating = (
    productReviews.reduce((acca, review) => {
      return acca + review.rating
    }, 0) / reviewCount
  ).toFixed(1)

  return (
    <Section
      sx={{
        maxWidth: 768, // JFN - felt 'sm' too small and 'md' slightly too big. Revisit
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2,
      }}>
      <Grid container direction="column" alignItems={{ xs: 'center', sm: 'start' }} rowGap={1}>
        <SectionHeading children="Customer Reviews" />
        <Grid container width="initial" alignItems="center" columnGap={1}>
          <Rating value={avgRating} precision={0.1} size="large" />
          <Typography
            component="p"
            variant="h5"
            lineHeight={0}
            color="primary.main"
            fontWeight={600}
            children={avgRating}
          />
          <Typography children={`(${reviewCount} Reviews)`} />
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          children="100% of customers recommend this product 👍" // or an actual Check icon
        />
        <Grid container direction="column-reverse">
          {[0, 1, 3, 23, 73].map((percentage, index) => (
            <RatingBar key={index} starCount={index + 1} percentage={percentage} />
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2 }}>
        <Grid item xs={12} sm={6}>
          <Button
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
          <Select label="Sort by" value={1}>
            <MenuItem value={1} children="Newest" />
            <MenuItem value={2} children="Oldest" />
            <MenuItem value={3} children="Highest Rating" />
            <MenuItem value={4} children="Lowest Rating" />
            <MenuItem value={5} children="Photos" />
          </Select>
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

const ProductReview = ({ _id, reviewer, rating, title, text, createdAt }) => {
  return (
    <Grid container direction="column" rowGap={1}>
      <Grid container alignItems="center" columnGap={1.5}>
        <Avatar src={reviewer.avatarUrl} />
        <Typography
          children={reviewer.firstName + ' ' + reviewer.lastName}
          fontWeight={500}
          flexGrow={1}
        />
        <MoreButton />
      </Grid>
      <Typography
        fontWeight={500}
        color="primary.dark"
        children={`"${title}"`}
        letterSpacing={-0.75}
      />
      <Grid container alignItems="center" columnGap={1}>
        <Rating value={rating} sx={{ fontSize: { xs: 16, sm: 20, md: 24, lg: 28 } }} />
        <Typography
          variant="caption" // JFN - too small for sm+
          lineHeight={1}
          color="text.secondary"
          children={createdAt}
        />
      </Grid>

      <Typography variant="body2" children={text} />
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
