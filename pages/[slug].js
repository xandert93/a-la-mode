import {
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
  TextLink,
} from '@/components'
import { ProductReviewsSection } from '@/components-page/product-detail'
import { NAMES } from '@/constants'
import { newProducts, popularProducts } from '@/data'
import { useToggle } from '@/hooks'
import { isHoverable } from '@/theming'
import { wait } from '@/utils/helpers'
import { Favorite, FavoriteBorder, HeartBroken, MoreHoriz } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  ClickAwayListener,
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
  price,
  description,
  features,
  imageUrls,
  stockCount,
  lastPurchasedAt,
  createdAt,
}) {
  // Nike made each a <input:radio> (interesting). But all sites seemed to perform a HTTP request each time a size was picked. Something to explore and revisit later.

  const [isRequesting, setIsRequesting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const toggleSave = async () => {
    setIsRequesting(true)
    await wait(1)
    setIsLiked((prev) => !prev)
    setIsRequesting(false)
  }

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
      <p>BreadCrumbs - see MUI</p>
      <Box p={2}>
        <Section maxWidth="lg">
          <Grid container>
            <Grid item sm={7} /* bgcolor="primary.light" */>
              <ImageShit imageUrls={imageUrls} />
            </Grid>
            <Grid item sm={5} /* bgcolor="secondary.light" */ p={2}>
              <Grid
                container
                direction="column"
                alignItems="flex-start" // without <Grid item> system, <ButtonBase> will stretch. Will remove if I start using <Grid item>s
                rowGap={2}>
                <Typography
                  variant="caption"
                  children="New"
                  bgcolor="text.primary"
                  color="background.default"
                  borderRadius={1}
                  py={0.5}
                  px={1}
                  boxShadow={4}
                />
                <Typography
                  component="h1" // *** all eComm website do this! Apparently is supposed to match <title>. But now have multiple and differing H1s...
                  variant="h6"
                  children={name}
                  fontWeight={400} // JFN
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
                <Typography component="p" variant="h6" children={'£' + price} />
                {/* <Typography children={description} /> */}

                <Grid container rowGap={1}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Typography children="Select Size:" fontWeight={500} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      children="Size Guide"
                      fontWeight={500}
                    />
                  </Grid>
                  <Grid container gap={2}>
                    {['s', 'm', 'l', 'xl', '2xl'].map((size) => (
                      <Button
                        key={size}
                        variant="outlined"
                        children={size}
                        sx={{ py: 1.5, px: 2 }}
                        disabled={['m', '2xl'].includes(size)}
                      />
                    ))}
                  </Grid>
                </Grid>

                <Grid container direction="column" rowGap={1}>
                  <Button variant="contained" children="Add to Bag" size="large" />
                  <LoadingButton
                    variant="contained"
                    isLoading={isRequesting}
                    onClick={toggleSave}
                    endIcon={isLiked ? <HeartIcon /> : <HeartIconOutlined />}
                    size="large">
                    Add{isLiked && 'ed'} to Wish List
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Section>
      </Box>
    </>
  )
}

{
  /* <Select
value={1}
label="Quantity"
fullWidth={false}
sx={{ minWidth: '8ch', textAlign: 'center' }}>
{[1, 2, 3, 4, 5].map((q) => (
  <MenuItem key={q} value={q} children={q} sx={{ justifyContent: 'center' }} />
))}
</Select> */
}

const ImageShit = ({ imageUrls }) => {
  const [index, setIndex] = useState(0)

  const changeImage = (newIndex) => () => setIndex(newIndex)

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={1.5}>
        <ImageStack imageUrls={imageUrls} changeImage={changeImage} imageIndex={index} />
      </Grid>
      <Grid item xs={10.5}>
        <Box>
          <Img
            src={imageUrls[index]}
            sx={{
              width: '100%',
              aspectRatio: '4/5',
              objectFit: 'cover',
              borderRadius: 1,
            }}
            alt="Product Image 1 of 3" // JFN
          />
        </Box>
      </Grid>
    </Grid>
  )
}

const ImageStack = ({ imageUrls, changeImage, imageIndex }) => {
  return (
    <Grid container direction="column" rowGap={1}>
      {imageUrls.map((url, index) => (
        <Box
          overflow="hidden"
          borderRadius={1}
          sx={{
            outline: imageIndex === index && '2px solid green',

            [isHoverable]: {
              ':hover': {
                filter: 'brightness(0.85)',
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
      ))}
    </Grid>
  )
}
