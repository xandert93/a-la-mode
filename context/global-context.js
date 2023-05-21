import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { genLineItem } from '@/data/starter-data'

const context = createContext()

export const useStore = () => useContext(context)

export const StoreProvider = (props) => {
  const [bagItems, setBagItems] = useState([])

  // just local methods for now
  const bag = {
    items: bagItems,
    itemCount: bagItems.length,

    addLineItem: (product, qty) => {
      // if line item not in bag, add it. If already in bag, just update its quantity
      setBagItems((prev) => {
        const isAlreadyInBag = prev.some((item) => item.name === product.name)

        if (isAlreadyInBag)
          return prev.map((item) => {
            if (item.name !== product.name) return item
            else return { ...item, quantity: item.quantity + qty }
          })
        else {
          // stripped `product` suitable for FE <ShoppingBag> display
          const newLineItem = genLineItem(product, qty)
          return [...prev, newLineItem]
        }
      })
    },

    removeLineItem: (name) => {
      setBagItems((prev) => prev.filter((item) => item.name !== name))
    },

    updateLineItemQty: (name, quantity) => {
      setBagItems((prev) =>
        prev.map((item) => {
          if (item.name !== name) return item
          else return { ...item, quantity }
        })
      )
    },

    clear: () => setBagItems([]), // should probably have a confirmation modal saying "are you sure"
  }

  return <context.Provider value={{ bag }} {...props} />
}

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
