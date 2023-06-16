'use client'

import { useState } from 'react'
import { WishListContextValue, wishListContext } from './wish-list-context'
import { genSavedItem } from '@/data/utils'
import { useEffectOnMount, useEffectOnUpdate } from '@/hooks'

type Props = {
  children: React.ReactNode
}

export const WishListProvider = (props: Props) => {
  const [items, setItems] = useState<SavedItem[]>([])

  // 🚧
  useEffectOnMount(() => {
    const initialItems = localStorage.getItem('saved-items')
    if (initialItems) setItems(JSON.parse(initialItems))
  })

  // 🚧
  useEffectOnUpdate(() => {
    localStorage.setItem('saved-items', JSON.stringify(items))
  }, [items])

  const value: WishListContextValue = {
    items,
    itemCount: items.length,
    hasItems: Boolean(items.length),

    addSavedItem: (product: Product) => {
      setItems((prev) => {
        const savedItem = genSavedItem(product) // not gonna add `size` for now (seems convention), cos home screen <ProductPreviewCard> doesn't enable size selection
        return [...prev, savedItem]
      })
    },

    // 🚧, since if we save item while on <ShoppingBag>, it's a LineItem, not a Product
    addSavedItemFromBag: (lineItem: SavedItem) => {
      setItems((prev) => [...prev, lineItem])
    },

    removeSavedItem: (name: string) => {
      setItems((prev) => prev.filter((item) => item.name !== name))
    },
  }

  return <wishListContext.Provider value={value} {...props} />
}
