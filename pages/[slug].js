import {
  FacebookIcon,
  HeartIcon,
  HeartIconOutlined,
  IconButton,
  Img,
  Link,
  LoadingButton,
  OutlinedButton,
  Section,
  SectionHeading,
  Select,
  ShareIcon,
  ArrowLeftIcon,
  TextLink,
  TwitterIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from '@/components'
import { ProductReviewsSection } from '@/components-page/product-detail'
import { NAMES } from '@/constants'
import { newProducts, popularProducts } from '@/data'
import { useToggle } from '@/hooks'
import { isHoverable } from '@/theming'
import { wait } from '@/utils/helpers'
import {
  Favorite,
  FavoriteBorder,
  HeartBroken,
  Info,
  InfoOutlined,
  InfoRounded,
  LocalShipping,
  LocalShippingOutlined,
  LocalShippingRounded,
  MoreHoriz,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  ClickAwayListener,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Grow,
  LinearProgress,
  MenuItem,
  Popper,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  Typography,
  IconButton as MuiIconButton,
  alpha,
} from '@mui/material'
import Head from 'next/head'
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

//   return (
//     <Box>
//

//       <h2>Customers also loved</h2>
//       <h2>Reviews</h2>
//     </Box>
//   )
// }

export default function ProductDetailPage({
  name,
  prices,
  description,
  features,
  imageUrls,
  stockCount,
  lastPurchasedAt,
  createdAt,
}) {
  // Nike made each a <input:radio> (interesting). But all sites seemed to perform a HTTP request each time a size was picked. Something to explore and revisit later.

  return (
    <>
      <Head>
        <title
          children={`${name} | ${NAMES.COMPANY}`} // *** accurate use?
        />
        <meta
          name="description"
          content={description} // *** accurate use?
        />
      </Head>
      {/* <p>BreadCrumbs - see MUI</p> */}

      <Section maxWidth="lg">
        <Grid
          container
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          justifyContent="center"
          gap={{ xs: 2 }}
          pt={2}>
          <Box maxWidth={{ xs: 640, md: 720 }}>
            <LHS imageUrls={imageUrls} />
          </Box>
          <Box minWidth={{ md: 360 }} maxWidth={640}>
            <RHS {...{ name, prices }} />
          </Box>
        </Grid>
      </Section>
    </>
  )
}

const oldConfig = () => {
  return (
    <Section
      sx={{
        maxWidth: (theme) => ({
          sm: 640, // at the moment the <LHS> wrapper <Grid> has implicit sm={12}. This is too big. While I could do sm={11 | 10} etc., this will cause the jarring effect when viewport is resized. This maxWidth approach (while against MUI), won't
          md: theme.breakpoints.values.lg,
        }),
      }} // temp
    >
      <Grid container>
        <Grid item xs={12} md={7}>
          <LHS />
        </Grid>
        <Grid item xs={12} md={5}>
          <RHS />
        </Grid>
      </Grid>
    </Section>
  )
}

const RHS = ({ name, prices, description, features, stockCount, lastPurchasedAt, createdAt }) => {
  const [isRequesting, setIsRequesting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const toggleSave = async () => {
    setIsRequesting(true)
    await wait(1)
    setIsLiked((prev) => !prev)
    setIsRequesting(false)
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start" // without <Grid item> system, <ButtonBase> will stretch. Will remove if I start using <Grid item>s
      rowGap={2.5}>
      <Typography
        variant="caption"
        children="New"
        bgcolor="text.primary"
        color="background.default"
        borderRadius={1}
        py={0.5}
        px={1}
        boxShadow={2} // just use card if I want this effect? Lol
      />

      <Grid
        container
        direction="column"
        alignItems="flex-start" // otherwise <ButtonBase> stretches, making whole line clickable
        rowGap={1.5}>
        <Typography
          component="h1" // *** all eComm website do this! Apparently is supposed to match <title>. But now have multiple and differing H1s...
          variant="h6"
          children={name}
          fontWeight={500} // JFN
          letterSpacing={-0.5}
        />
        <ButtonBase
          href="#" // *** might end up just being a button too - undecided
          sx={{
            columnGap: 2,
            borderRadius: 1,
            // py: 0.5,
          }}>
          <Rating value={3.7} />
          <Typography children="3.7 (898)" />
        </ButtonBase>
        <Box>
          <Typography
            component="span"
            variant="h6"
            color="text.disabled"
            children={'£' + prices.standard}
            sx={{ textDecoration: 'line-through' }} // probably only wanna do this if (prices.offer), for example
            mr={0.5} // JFN
          />
          {'   '}
          <Typography
            component="span"
            variant="h6"
            children={'£' + prices.offer}
            color="secondary.main"
          />
        </Box>
      </Grid>

      <Grid container rowGap={1.5}>
        <Typography variant="body2" children="Select your color:" fontWeight={500} />
        <Grid container columnGap={2}>
          {['beige', 'navy', 'primary.dark', 'black'].map((c) => (
            <Box
              key={c}
              height={30}
              width={30}
              bgcolor={c}
              borderRadius="50%"
              border={'2px solid'}
              borderColor="primary.light"
            />
          ))}
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="body2" children="Select your size:" fontWeight={500} />
          <Typography
            variant="body2"
            color="text.secondary"
            children="Size Guide"
            fontWeight={500}
          />
        </Grid>
        <Grid container gap={{ xs: 1, md: 1.5, xl: 2 }}>
          {['xs', 's', 'm', 'l', 'xl', '2xl'].map((size) => (
            <Button
              key={size}
              variant="outlined"
              children={size}
              sx={{ py: 1.5, px: 2 }}
              disabled={['m', '2xl'].includes(size)}
            />
          ))}
        </Grid>
        <Box>
          <Typography variant="body2" children="Size Missing?" fontWeight={500} />
          <Typography
            variant="body2"
            children="Sign up to be notified when the product comes back in stock" // Add "Notify Me 🔔" link or button
          />
        </Box>
      </Grid>

      <Grid container columnGap={1.5}>
        <Img
          src="/images/popular-star.gif"
          height="40px"
          bgcolor="secondary.main"
          borderRadius="50%"
          p={0.5}
        />
        <Box>
          <Typography variant="body2" children="Best Seller" fontWeight={500} />
          <Typography variant="body2" children="7 sold today!" />
        </Box>
      </Grid>

      <Grid container direction="column" rowGap={1}>
        <Button variant="contained" children="Add to Bag" size="large" />
        <LoadingButton
          variant="contained"
          isLoading={isRequesting}
          onClick={toggleSave}
          endIcon={isLiked ? <HeartIcon /> : <HeartIconOutlined />}
          size="large">
          {isLiked ? 'Saved' : 'Add to Wish List'}
        </LoadingButton>
      </Grid>
      <Grid
        container
        wrap="nowrap"
        alignItems="center"
        columnGap={2}
        bgcolor="primary.touch"
        py={1}
        pl={2}
        pr={1} // JFN - since <IconButton> already has padding applied
        borderRadius={1} // use paper/card instead?
        color="primary.dark">
        <LocalShippingOutlined />
        <Typography
          variant="body2"
          children="Free standard delivery on orders over £50"
          flexGrow={1}
        />
        <IconButton
          children={<InfoOutlined />}
          onClick // see M&S - open modal displaying shipping data
        />
      </Grid>
    </Grid>
  )
}

/* <Select
value={1}
label="Quantity"
fullWidth={false}
sx={{ minWidth: '8ch', textAlign: 'center' }}>
{[1, 2, 3, 4, 5].map((q) => (
  <MenuItem key={q} value={q} children={q} sx={{ justifyContent: 'center' }} />
))}
</Select> */

/*
"interest free payment with paypal" message - see M&S:

                <Grid container alignItems="center" wrap="nowrap" bgcolor="white">
                  <Typography children="Interest-free payments available on orders between £30 - £2000 with" />
                  <Img src="/images/payment-methods/paypal.png" width="50px" />
                  or
                  <Img src="/images/payment-methods/klarna.png" width="50px" />
                  <IconButton children={<InfoOutlined />} />
                </Grid>


Share product to socials:

<Box>
                  <ShareIcon />
                  <FacebookIcon />
                  <TwitterIcon />
                  <WhatsAppIcon />
                </Box>


Gonna leave product details, features and colours for now. Need to determine type of eCommerce
For example, if clothing, customer usually just impulsively look at image and buys - details/features are commonly hidden in accordion
But for electronics, where customer makes a considered purchase, description and feature list must be immediately visible

*/

const LHS = ({ imageUrls }) => {
  const imageCount = imageUrls.length

  const [index, setIndex] = useState(0)

  const changeImage = (newIndex) => () => setIndex(newIndex)

  // JFN - probs better way lol
  const toPrevImage = () => {
    setIndex((curr) => {
      return curr === 0 ? imageCount - 1 : curr - 1
    })
  }

  // JFN - probs better way lol
  const toNextImage = () => {
    setIndex((curr) => {
      return curr === imageCount - 1 ? 0 : curr + 1
    })
  }

  return (
    <Grid container spacing={1} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
      <Grid item xs={12} md={1.5}>
        <ImageStack imageUrls={imageUrls} changeImage={changeImage} imageIndex={index} />
      </Grid>
      <Grid item xs={12} md={10.5} sx={{ position: 'relative' }}>
        <Fade
          in
          timeout={500}
          key={index} // JFN - bit of a hack, but desired effect. Best way to achieve?
        >
          <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
            <Img
              src={imageUrls[index]}
              sx={{
                width: '100%',
                aspectRatio: { xs: '1/1', md: '4/5' },
                objectFit: 'cover',
              }}
              alt="Product Image 1 of 3" // JFN
            />
          </Box>
        </Fade>
        <Grid
          container
          width="fit-content"
          sx={{ position: 'absolute', bottom: 8, right: 8 }}
          columnGap={1}>
          <MuiIconButton
            // JFN - kinda broken styling (even with default muiiconbutton because its not supposed to be styled like I have below) - need to come back and configure
            sx={{ bgcolor: 'white', p: 0.5, border: '2px solid', borderColor: 'primary.main' }}
            children={<ArrowLeftIcon fontSize="large" />}
            onClick={toPrevImage}
          />
          <MuiIconButton
            sx={{ bgcolor: 'white', p: 0.5, border: '2px solid', borderColor: 'primary.main' }}
            children={<ArrowRightIcon fontSize="large" />}
            onClick={toNextImage}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

// Nike also has < and > buttons in bottom right of their main image. Could add later

const ImageStack = ({ imageUrls, changeImage, imageIndex }) => {
  return (
    <Grid container spacing={1}>
      {imageUrls.map((url, index) => (
        <Grid item xs={2.4} md={12} key={index}>
          <Box
            overflow="hidden"
            borderRadius={1}
            sx={{
              border: '1px solid transparent',
              transition: (theme) => theme.transitions.create('border-color'),

              ...(imageIndex === index && {
                borderColor: 'secondary.light',
              }),

              [isHoverable]: {
                ':hover': {
                  filter: 'brightness(0.9)',
                },
              },
            }}
            onClick={changeImage(index)}
            onMouseEnter={changeImage(index)}>
            <Img
              src={url}
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
