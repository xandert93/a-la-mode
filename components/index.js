export { Form } from './Form'
export { CompanyLogo } from './CompanyLogo'
export { CompanyHeading } from './CompanyHeading'
export { SearchInputAdornment } from './SearchInputAdornment'
export { PaymentMethodImageList } from './PaymentMethodImageList'
export { PaymentMethods } from './PaymentMethods'

export { Img, Image, CoverImage, BackgroundVideo } from './Images'

export { ImageButton, IconButton, LoadingButton, OutlinedButton } from './Buttons'

export { Main, Section, Accordion } from './Containers'
export { SectionHeading, SectionSubHeading } from './Headings'

export { Link, TextLink, ButtonLink } from './Links'

export { Checkbox, CheckboxGroup, Select, Radio, RadioGroup } from './Inputs'

export { GradientTypography, MoneyTypography, IconTypography, Span } from './Typographies'

export { FacebookCircularProgress } from './Loaders'

export { CostRow } from './CostRow'

/*
❓ MUI docs suggest doing (particularly for its icons) 👇 if we don't have Babel 
(which tree-shakes for development, not just production).

But Next has SWC (17x faster than Babel) and I still experienced unbearable lag and
"The server is running out of memory, restarting to free up memory" message having used
named imports for all MUI components and icons.

The issue was raised here: https://github.com/vercel/next.js/issues/46756 and default imports
was suggested and now things are much faster during development. 
It went onto suggest applying the `modularizeImports` setting for MUI components and icons,
but this didn't work for me. Something to do with the fact that I'm barrel exporting icons? 
IDK.
*/

export { default as HeartIcon } from '@mui/icons-material/Favorite'
export { default as HeartIconOutlined } from '@mui/icons-material/FavoriteBorder'
export { default as MenuIcon } from '@mui/icons-material/Menu'
export { default as SearchIcon } from '@mui/icons-material/Search'
export { default as LocationIcon } from '@mui/icons-material/Place'
export { default as TelephoneIcon } from '@mui/icons-material/Phone'
export { default as EmailIcon } from '@mui/icons-material/Email'
export { default as EmailSuccessIcon } from '@mui/icons-material/MarkEmailRead'
export { default as ArrowLeftIcon } from '@mui/icons-material/ArrowLeft'
export { default as ArrowRightIcon } from '@mui/icons-material/ArrowRight'
export { default as ArrowForwardIcon } from '@mui/icons-material/ArrowForward'
export { default as SendIcon } from '@mui/icons-material/Send'
export { default as GoogleIcon } from '@mui/icons-material/Google'
export { default as FacebookIcon } from '@mui/icons-material/Facebook'
export { default as AppleIcon } from '@mui/icons-material/Apple'
export { default as InstagramIcon } from '@mui/icons-material/Instagram'
export { default as PinterestIcon } from '@mui/icons-material/Pinterest'
export { default as WhatsAppIcon } from '@mui/icons-material/WhatsApp'
export { default as TwitterIcon } from '@mui/icons-material/Twitter'
export { default as YouTubeIcon } from '@mui/icons-material/YouTube'
export { default as ShareIcon } from '@mui/icons-material/Share'
export { default as AddIcon } from '@mui/icons-material/Add'
export { default as AccordionOpenIcon } from '@mui/icons-material/ExpandMore'
export { default as InformationIcon } from '@mui/icons-material/InfoOutlined'
export { default as ShippingIcon } from '@mui/icons-material/LocalShippingOutlined'
export { default as DeleteIcon } from '@mui/icons-material/DeleteOutlined'
export { default as ClearIcon } from '@mui/icons-material/Clear'
export { default as CloseIcon } from '@mui/icons-material/Close'
export { default as ApproveIcon } from '@mui/icons-material/Approval'
export { default as BagIcon } from '@mui/icons-material/ShoppingBag'
export { default as EmptyBagIcon } from '@mui/icons-material/ShoppingBagOutlined'
export { default as ReceiptIcon } from '@mui/icons-material/ReceiptOutlined'
export { default as ClockIcon } from '@mui/icons-material/AccessTime'
export { default as ValidateIcon } from '@mui/icons-material/PublishedWithChanges'
export { default as AccountIcon } from '@mui/icons-material/PersonOutline'
export { default as GiftIcon } from '@mui/icons-material/RedeemOutlined'
export { default as CircleIcon } from '@mui/icons-material/Circle'
export { default as CircleElectricIcon } from '@mui/icons-material/OfflineBolt'
export { default as StarIcon } from '@mui/icons-material/Star'
