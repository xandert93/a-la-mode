import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { genLineItem } from '@/data/starter-data'
import { useEffectOnMount, useEffectOnUpdate } from '@/hooks'

const context = createContext()

export const useBag = () => useContext(context).bag
export const useWishList = () => useContext(context).wishList

const tax = 0

const delivery = {
  costs: {
    standard: 499,
  },
  freeThreshold: 5000,
}

export const StoreProvider = (props) => {
  const [bagItems, setBagItems] = useState([])
  const [savedItems, setSavedItems] = useState([])

  // JFN
  useEffectOnMount(() => {
    const initialBagItems = JSON.parse(localStorage.getItem('bag-items')) ?? [] // will be `null` if absent
    const initialSavedItems = JSON.parse(localStorage.getItem('saved-items')) ?? [] // will be `null` if absent
    setBagItems(initialBagItems)
    setSavedItems(initialSavedItems)
  })

  // JFN
  useEffectOnUpdate(() => {
    localStorage.setItem('bag-items', JSON.stringify(bagItems))
  }, [bagItems])

  // JFN
  useEffectOnUpdate(() => {
    localStorage.setItem('saved-items', JSON.stringify(savedItems))
  }, [savedItems])

  // JFN
  const subtotal = bagItems.reduce((acca, item) => {
    if (item.stock.count) acca += item.price * item.qty
    return acca
  }, 0)

  // just local properties + methods JFN
  let bag = {
    items: bagItems,
    itemCount: bagItems.length,
    hasItems: Boolean(bagItems.length),

    addLineItem: (product, qty) => {
      // if line item not in bag, add it. If already in bag, just update its qty
      setBagItems((prev) => {
        const isAlreadyInBag = prev.some((item) => item.name === product.name)

        if (isAlreadyInBag)
          return prev.map((item) => {
            if (item.name !== product.name) return item
            else return { ...item, qty } // previously increment existing quantity by new quantity, but this is easier to implement to ensure client can only add 9 max of a product to bag rather than 7 and then 8 to get 15 in bag
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

    // no ecommerce site seems to have this (unsurprising lol), but JIC:
    clear: () => setBagItems([]), // should probably have a confirmation modal saying "are you sure"
  }

  // JFN, but add this crap to bag
  delivery.freeOffset = delivery.freeThreshold - subtotal
  const hasFreeDelivery = delivery.freeOffset <= 0
  const deliveryCost = hasFreeDelivery ? 0 : delivery.costs.standard

  bag = {
    ...bag,
    // an absolute mess but leave it for now lol
    delivery: {
      freeOffset: delivery.freeOffset,
    },

    costs: {
      subtotal,
      delivery: deliveryCost,
      tax,
      total: subtotal + deliveryCost + tax,
    },
  }

  const wishList = {
    items: savedItems,
    itemCount: savedItems.length,
    hasItems: Boolean(savedItems.length),

    addSavedItem: (product) => {
      setSavedItems((prev) => {
        const savedItem = genLineItem(product)
        return [...prev, savedItem]
      })
    },

    // JFN, since if we save item while on <ShoppingBag>, its a line item object, not a product
    addSavedItemFromBag: (savedItem) => {
      setSavedItems((prev) => {
        return [...prev, savedItem]
      })
    },

    removeSavedItem: (name) => {
      setSavedItems((prev) => prev.filter((item) => item.name !== name))
    },
  }

  return <context.Provider value={{ bag, wishList }} {...props} />
}

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
