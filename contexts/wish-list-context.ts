import { createContext, useContext } from 'react'

export type WishListContextValue = {
  items: SavedItem[]
  itemCount: number
  hasItems: boolean

  addSavedItem: (product: Product) => void
  addSavedItemFromBag: (savedItem: SavedItem) => void
  removeSavedItem: (name: string) => void
}

const initialValue = {
  items: [],
  itemCount: 0,
  hasItems: false,

  addSavedItem: (product: Product) => {},
  // 🚧, since if we save item while on <ShoppingBag>, it's a LineItem, not a Product
  addSavedItemFromBag: (savedItem: SavedItem) => {},
  removeSavedItem: (name: string) => {},
}

export const wishListContext = createContext<WishListContextValue>(initialValue)

export const useWishList = () => useContext(wishListContext)
