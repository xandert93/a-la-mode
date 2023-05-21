import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { genLineItem } from '@/data/starter-data'
import { useEffect } from 'react'
import { useEffectOnMount, useEffectOnUpdate } from '@/hooks'

const context = createContext()

export const useStore = () => useContext(context)

export const StoreProvider = (props) => {
  const [bagItems, setBagItems] = useState([])

  // JFN
  useEffectOnMount(() => {
    const initialBagItems = JSON.parse(localStorage.getItem('bag-items')) ?? [] // will be `null` if absent
    setBagItems(initialBagItems)
  })

  // JFN
  useEffectOnUpdate(() => {
    localStorage.setItem('bag-items', JSON.stringify(bagItems))
  }, [bagItems])

  // just local methods for now
  const bag = {
    items: bagItems,
    itemCount: bagItems.length,

    addLineItem: (product, qty) => {
      // if line item not in bag, add it. If already in bag, just update its qty
      setBagItems((prev) => {
        const isAlreadyInBag = prev.some((item) => item.name === product.name)

        if (isAlreadyInBag)
          return prev.map((item) => {
            if (item.name !== product.name) return item
            else return { ...item, qty: item.qty + qty }
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

    updateLineItemQty: (name, qty) => {
      setBagItems((prev) =>
        prev.map((item) => {
          if (item.name !== name) return item
          else return { ...item, qty }
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
