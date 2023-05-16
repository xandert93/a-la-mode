import { slugify } from '@/utils/helpers'

export const promotions = [
  {
    title: 'Free UK Delivery on orders over £50',
    message: "Use code: 'SMOOTHDEL' at checkout",
    priority: 1,
  },
  {
    title: 'Calling All Students',
    message: 'Get 20% Off',
    priority: 2,
  },
  {
    title: 'Stuck for ideas?',
    message: 'Shop our E-Gift Card Now',
    priority: 3,
  },
]

export const publications = [
  {
    name: 'Elle',
    imageUrl: '/images/publications/elle.png',
  },
  {
    name: 'GQ',
    imageUrl: '/images/publications/gq.png',
  },
  {
    name: 'Cosmopolitan',
    imageUrl: '/images/publications/cosmopolitan.png',
  },
  {
    name: 'Hello',
    imageUrl: '/images/publications/hello.png',
  },
  {
    name: 'Marie Claire',
    imageUrl: '/images/publications/marie-claire.png',
  },
  {
    name: 'Vogue',
    imageUrl: '/images/publications/vogue.png',
  },
]

export const brands = [
  {
    name: 'DKNY',
    imageUrl: '/images/brands/dkny.png',
  },
  {
    name: 'Topman',
    imageUrl: '/images/brands/topman.png',
  },
  {
    name: 'Lacoste',
    imageUrl: '/images/brands/lacoste.png',
  },
  {
    name: 'Ralph Lauren',
    imageUrl: '/images/brands/ralph-lauren.png',
  },
  {
    name: 'K Swiss',
    imageUrl: '/images/brands/k-swiss.png',
  },
  {
    name: 'Tommy Hilfiger',
    imageUrl: '/images/brands/tommy-hilfiger.png',
  },
]

export const categories = ['Men', 'Women', /* 'Sport', */ 'Collections', 'The Brand']

export const collections = [
  {
    title: 'Fall Fervor',
    description: 'Reset your style for the new season with our autumn outfits',
    imageUrl: '/images/collections/fall.jpg',
  },
  {
    title: 'Summer Splendor',
    description: 'Get ready for the warm weather with our summer wear',
    imageUrl: '/images/collections/summer.jpg',
  },
  {
    title: 'Winter Wonderland',
    description: 'Let it snow - layer up with winter essentials that you will love',
    imageUrl: '/images/collections/winter.jpg',
  },
  {
    title: 'Spring Suaveness',
    description: 'Spring into the season with our newest edit of spring clothes',
    imageUrl: '/images/collections/spring.jpg',
  },
  {
    title: 'Festive Fidelity',
    description: 'Stay warm and stylish during the holidays with our festive take',
    imageUrl: '/images/collections/festive.jpg',
  },
]

const popularProducts = [
  {
    name: 'Natural Herringbone Linen Jacket',
    price: 79,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis officia veritatis sunt nostrum quas tempore necessitatibus tenetur. Dolorum reprehenderit facilis veritatis modi. Illo facere, vel ratione assumenda nisi ex quibusdam!',
    features: ['feature 1', 'feature 2', 'feature 3', 'feature 4'],
    imageUrls: [
      '/images/products/popular/linen-jacket-1.jpg',
      '/images/products/popular/linen-jacket-2.jpg',
      '/images/products/popular/linen-suit-1.jpg',
      '/images/products/popular/linen-suit-2.jpg',
      '/images/products/popular/polo-shirt-1.jpg',
      // '/images/products/popular/polo-shirt-2.jpg',
      // '/images/products/popular/polo-shirt-3.jpg',
      // '/images/products/popular/polo-shirt-4.jpg',
      // 'https://cdn.sportmonks.com/images/soccer/teams/10/42.png',
    ],
    stockCount: 10,
    lastPurchasedAt: 'Yesterday',
    createdAt: '', // can display "NEW" flag in UI
  },
  {
    name: 'Non-Iron Pink & White Bengal Stripe Fitted Slim Shirt',
    price: 29,
    imageUrls: [
      '/images/products/popular/slim-shirt-1.jpg',
      '/images/products/popular/slim-shirt-2.jpg',
    ],
  },
  {
    name: 'Royal Blue 2 Piece Italian Cotton Linen Slim Suit',
    price: 139,
    imageUrls: [
      '/images/products/popular/linen-suit-1.jpg',
      '/images/products/popular/linen-suit-2.jpg',
    ],
  },
  {
    name: 'Navy Mercerised Pique Polo Shirt',
    price: 39,
    imageUrls: [
      '/images/products/popular/polo-shirt-1.jpg',
      '/images/products/popular/polo-shirt-2.jpg',
    ],
  },
  {
    name: 'Taupe Mercerised Pique Polo Shirt',
    price: 39,
    imageUrls: [
      '/images/products/popular/polo-shirt-3.jpg',
      '/images/products/popular/polo-shirt-4.jpg',
    ],
  },
]

const newProducts = [
  {
    name: 'Black Printed Paisley Velvet Tuxedo Jacket',
    price: 349,
    imageUrls: [
      '/images/products/new/tuxedo-jacket-1.jpg',
      '/images/products/new/tuxedo-jacket-2.jpg',
    ],
  },
  {
    name: 'White & Cream Broken Stripe Pussy Bow Blouse',
    price: 45,
    imageUrls: [
      '/images/products/new/stripe-blouse-1.jpg',
      '/images/products/new/stripe-blouse-2.jpg',
    ],
  },
  {
    name: 'Light Grey Twill 3 Piece Slim Suit',
    price: 429,
    imageUrls: ['/images/products/new/grey-suit-1.jpg', '/images/products/new/grey-suit-2.jpg'],
  },
  {
    name: 'Pink & Black Abstract Paint Pussy Bow Blouse',
    price: 45,
    imageUrls: ['/images/products/new/pink-blouse-1.jpg', '/images/products/new/pink-blouse-2.jpg'],
  },
  {
    name: 'Men’s Navy Plain Velvet Jacket',
    price: 279,
    imageUrls: [
      '/images/products/new/velvet-jacket-1.jpg',
      '/images/products/new/velvet-jacket-2.jpg',
    ],
  },
]

popularProducts.forEach((product) => {
  product.slug = slugify(product.name)
})
newProducts.forEach((product) => {
  product.slug = slugify(product.name)
})

export { popularProducts, newProducts }

// additional product fields: productId, priceId

// additional product review fields: productId, reviewer._id
export const productReviews = [
  {
    _id: 1,
    reviewer: {
      firstName: 'Carlos',
      lastName: 'Vela',
      avatarUrl: '/images/users/carlos-vela.png',
    },
    rating: 5,
    title: 'Choose one size smaller',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, non.',
    createdAt: '3 hours ago',
  },
  {
    _id: 2,
    reviewer: {
      firstName: 'Lotta',
      lastName: 'Lindgren',
      avatarUrl: '/images/users/lotta-lindgren.jpg',
    },
    rating: 4,
    title: 'Very relaxed fit, perfect for daily use',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, odio hic. Ex, harum. Voluptates beatae illo nam eos, sapiente a impedit facilis quidem, architecto iure, ullam obcaecati porro in. Distinctio deserunt magni, ab quod quos illum corrupti! Aliquam libero magni esse iste voluptates accusantium consequuntur repellat incidunt facilis commodi! Assumenda?',
    createdAt: 'Yesterday',
  },
  {
    _id: 3,
    reviewer: {
      firstName: 'Ken',
      lastName: 'Yates',
      avatarUrl: '/images/users/ken-yates.jpg',
    },
    rating: 5,
    title: 'Excellent design, very comfy and stylish',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dolore quam inventore natus omnis doloribus hic quas, ratione explicabo error?',
    createdAt: '4 days ago',
  },
  {
    _id: 4,
    reviewer: {
      firstName: 'Jordan',
      lastName: 'Davis',
      avatarUrl: '/images/users/jordan-davis.jpg',
    },
    rating: 4,
    title: 'Classic fit and high quality',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis mollitia iste ducimus dolore excepturi dicta a aut voluptates natus deserunt, nam vitae assumenda commodi eligendi cumque perferendis similique reprehenderit?',
    createdAt: 'Last week',
  },
  {
    _id: 5,
    reviewer: {
      firstName: 'Sam',
      lastName: 'Cooke',
      avatarUrl: '/images/users/sam-cooke.jpg',
    },
    rating: 4,
    title: "I like it, but the size isn't consistent with the chart",
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores temporibus esse eveniet quasi necessitatibus optio.',
    createdAt: '2 weeks ago',
  },
]

export const blogArticles = [
  {
    title: 'Formal Wear',
    body: 'Luxury meets history. Stylish formal wear that exudes confidence. Crafted from luxurious Italian fabrics, our menswear collections will give you an ultra-smart and polished look, perfect for prestigious events.',
    imageUrl: '/images/blog-articles/formal-wear.jpg',
  },
  {
    title: 'Smart-Casual Wear',
    body: 'Tailored in excellence, find a great balance between formalwear and a more casual look. Timeless piece will elevate your style in ways.',
    imageUrl: '/images/blog-articles/smart-casual-wear.jpg',
  },
  {
    title: 'Casual Wear',
    body: 'Relaxed but still with and edge of smart tailoring. Opt for formal comfort with our fresh chinos paired with light linen shirts or blazers to your preference.',
    imageUrl: '/images/blog-articles/casual-wear.jpg',
  },
]

export const paymentMethods = [
  {
    name: 'mastercard',
    imageUrl: '/images/payment-methods/mastercard.png',
  },
  {
    name: 'visa',
    imageUrl: '/images/payment-methods/visa.png',
  },
  {
    name: 'amex',
    imageUrl: '/images/payment-methods/amex.png',
  },
  {
    name: 'google-pay',
    imageUrl: '/images/payment-methods/google-pay.png',
  },
  {
    name: 'apple-pay',
    imageUrl: '/images/payment-methods/apple-pay.png',
  },
  {
    name: 'paypal',
    imageUrl: '/images/payment-methods/paypal.png',
  },
  {
    name: 'stripe',
    imageUrl: '/images/payment-methods/stripe.png',
  },
  {
    name: 'klarna',
    imageUrl: '/images/payment-methods/klarna.png',
  },
]

// unused:
export const heroItems = [
  {
    title: 'Summer Collection',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, repellendus.',
    imageUrl: '/images/hero-carousel/collection-summer.png',
    href: '#',
  },
  {
    title: 'Fall Collection',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, repellendus.',
    imageUrl: '/images/hero-carousel/collection-fall.png',
    href: '#',
  },
  {
    title: 'Winter Collection',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, repellendus.',
    imageUrl: '/images/hero-carousel/collection-winter.png',
    href: '#',
  },
  {
    title: 'Spring Collection',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, repellendus.',
    imageUrl: '/images/hero-carousel/collection-spring.png',
    href: '#',
  },
]
