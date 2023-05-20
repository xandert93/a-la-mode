import {
  HeartIcon,
  HeartIconOutlined,
  IconButton,
  Img,
  LoadingButton,
  Section,
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationIcon,
  DeliveryIcon,
  MoneyTypography,
} from '@/components'
import { isHoverable } from '@/theming'
import { wait } from '@/utils/helpers'
import {
  Box,
  Button,
  ButtonBase,
  Fade,
  Grid,
  Rating,
  Typography,
  IconButton as MuiIconButton,
} from '@mui/material'

import { useState } from 'react'

export const ProductDetailSection = ({
  name,
  prices,
  description,
  features,
  imageUrls,
  stockCount,
  lastPurchasedAt,
  createdAt,
}) => {
  return (
    <Section
      maxWidth="lg"
      sx={{ pt: 2 }} // temp
    >
      {/* the minWidth & maxWidth on this 👇 <Grid> work closely together, sometimes desirably engaging in a tug-of-war for space. Understand well before editing */}
      <Grid
        container
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        justifyContent="center"
        gap={{ xs: 2 }}>
        <Box maxWidth={{ xs: 640, md: 720 }}>
          <LHS imageUrls={imageUrls} />
        </Box>
        <Box minWidth={{ md: 400 }} maxWidth={640}>
          <RHS {...{ name, prices }} />
        </Box>
      </Grid>
    </Section>
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
          {prices.previous && (
            <MoneyTypography
              component="span"
              variant="h6"
              color="text.disabled"
              children={prices.previous}
              sx={{ textDecoration: 'line-through' }}
              mr={0.5} // JFN
            />
          )}
          {'   '}
          <MoneyTypography
            component="span"
            variant="h6"
            children={prices.current}
            color={prices.previous && 'secondary.main'}
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
              sx={{ py: 1.5, px: 2, textTransform: 'uppercase' }}
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
        {/* Quantity <Select> or "- val +" form control need to go in here somewhere, but where...? */}
        {/* Think these 👇 two buttons are a bit too thin on mobile and also need more space between due to inaccuracy of touch vs pointer */}
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
        <DeliveryIcon />
        <Typography
          variant="body2"
          children="Free standard delivery on orders over £50"
          flexGrow={1}
        />
        <IconButton
          children={<InformationIcon />}
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
        <Grid
          item
          xs={2.4} // 5 per row
          sm={2} // 6 per row
          md={12} // 1 per row, but row only consumes 1.5/12 (see <ImageStack> parent)
          key={index}>
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
