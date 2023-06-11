'use client'

import { useState } from 'react'
import { BagContextValue, bagContext } from './bag-context'
import { useEffectOnMount, useEffectOnUpdate } from '@/hooks'
import { genLineItem } from '@/data/utils'

// all JFN
const freeShippingThreshold = 5000
const standardShippingCost = 499
const tax = 0

export const BagProvider: React.FC = (props) => {
  const [items, setItems] = useState<LineItem[]>([])

  // JFN
  useEffectOnMount(() => {
    const initialItems = localStorage.getItem('bag-items')
    if (initialItems) setItems(JSON.parse(initialItems))
  })

  // JFN
  useEffectOnUpdate(() => {
    localStorage.setItem('bag-items', JSON.stringify(items))
  }, [items])

  // JFN
  const subtotal = items.reduce((acca, item) => {
    if (item.stock.count) acca += item.price * item.qty
    return acca
  }, 0)

  // JFN, but add this crap to bag
  const freeShippingOffset = freeShippingThreshold - subtotal
  const hasFreeShipping = freeShippingOffset <= 0
  const shippingCost = hasFreeShipping ? 0 : standardShippingCost

  // just local properties + methods JFN
  const value: BagContextValue = {
    items: items,
    itemCount: items.length,
    hasItems: Boolean(items.length),

    addLineItem: (args: { product: Product; color: string; size: string; qty: number }) => {
      const { product, color, size, qty } = args

      // if line item not in bag, add it. If already in bag, just update its qty
      setItems((prev) => {
        const isBagged = prev.some((item) => item.name === product.name) // already in bag?

        if (isBagged)
          return prev.map((item) => {
            if (item.name !== product.name) return item
            else return { ...item, color, size, qty } // update color + size selection and previously increment existing quantity by new quantity, but this is easier to implement to ensure client can only add 9 max of a product to bag rather than 7 and then 8 to get 15 in bag
          })
        else {
          // stripped `product` suitable for FE <ShoppingBag> display
          const newLineItem = genLineItem(args)
          return [...prev, newLineItem]
        }
      })
    },

    removeLineItem: (name: string) => {
      setItems((prev) => prev.filter((item) => item.name !== name))
    },

    updateLineItemQty: (name: string, qty: number) => {
      setItems((prev) =>
        prev.map((item) => {
          return item.name !== name ? item : { ...item, qty }
        })
      )
    },

    // no ecommerce site seems to have this (unsurprising lol), but JIC:
    clear: () => setItems([]), // should probably have a confirmation modal saying "are you sure"

    // an absolute mess but leave it for now lol
    shipping: {
      freeOffset: freeShippingOffset,
    },

    costs: {
      subtotal,
      shipping: shippingCost,
      tax, // JFN
      total: subtotal + shippingCost + tax,
    },
  }

  return <bagContext.Provider value={value} {...props} />
}
