// create temporary stripped `product` suitable for FE <ShoppingBag> display. This will come from DB in reality.

type GenLineItemArg = {
  product: Product
  color: string
  size: string
  qty: number
}

export const genLineItem = ({ product, color, size, qty }: GenLineItemArg): LineItem => ({
  name: product.name,
  slug: product.slug,
  price: product.prices.current,
  imageUrl: product.imageUrls[0],
  // determined by client:
  color,
  size,
  qty,
  isSaved: false, // JFN
  // *** JFN:
  stock: product.stock,
})

// create temporary stripped `product` suitable for FE <WishList> display. This will come from DB in reality.
export const genSavedItem = (product: Product): SavedItem => ({
  name: product.name,
  slug: product.slug,
  prices: product.prices,
  imageUrl: product.imageUrls[0],
})
