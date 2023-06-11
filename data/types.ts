type Product = {
  name: string
  slug: string
  prices: { previous?: number; current: number }
  description?: string
  features?: string[]
  imageUrls: string[]
  stock: { count: number; isAvailable: boolean; isLow: boolean }
  rating: { count: number; average: number }
  colors?: string[]
  lastPurchasedAt?: string
  createdAt?: string
}

type SavedItem = {
  name: string
  slug: string
  prices: { previous?: number; current: number }
  imageUrl: string
}

type LineItem = {
  name: string
  slug: string
  price: number
  imageUrl: string
  color: string
  size: string
  qty: number
  isSaved: boolean
  stock: { count: number; isAvailable: boolean; isLow: boolean }
}
