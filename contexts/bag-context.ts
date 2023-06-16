import { createContext, useContext } from 'react'

export type BagContextValue = {
  items: LineItem[]
  itemCount: number
  hasItems: boolean

  addLineItem: (data: { product: Product; color: string; size: string; qty: number }) => void
  removeLineItem: (name: string) => void
  updateLineItemQty: (name: string, qty: number) => void
  clear: () => void

  shipping: { freeOffset: number }

  // ❗ quicker way to do this i.e. type an object of number values? : https://stackoverflow.com/questions/13315131/enforcing-the-type-of-the-indexed-members-of-a-typescript-object
  costs: {
    subtotal: number
    shipping: number
    tax: number
    total: number
  }
}

const initialValue = {
  items: [],
  itemCount: 0,
  hasItems: false,

  addLineItem: (args: { product: Product; color: string; size: string; qty: number }) => {},
  removeLineItem: (name: string) => {},
  updateLineItemQty: (name: string, qty: number) => {},
  // no ecommerce site seems to have this (unsurprising lol), but JIC:
  clear: () => {}, // should probably have a confirmation modal saying "are you sure"

  // an absolute mess but leave it for now lol
  shipping: {
    freeOffset: 0,
  },

  costs: {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
}

export const bagContext = createContext<BagContextValue>(initialValue)

export const useBag = () => useContext(bagContext)
