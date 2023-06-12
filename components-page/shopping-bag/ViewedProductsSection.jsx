import { Link, Section } from '@/components'
import { useBag } from '@/contexts/bag-context'

import { useEffectOnMount } from '@/hooks'
import { useState } from 'react'

// M&S, JD and Next included this at foot of ShoppingBagPage. WishListPage never had it, though! Fair lol
export const ViewedProductsSection = () => {
  const bag = useBag()
  const [products, setProducts] = useState([])

  const hasProducts = Boolean(products.length)

  // JFN - total BS
  useEffectOnMount(() => {
    const viewedProducts = JSON.parse(localStorage.getItem('viewed-products'))
    if (viewedProducts) {
      setProducts(
        viewedProducts.filter((p) => {
          const isProductInBag = bag.items.some((i) => i.name === p.name)
          return !isProductInBag
        })
      )
    }
  })

  return !hasProducts ? null : (
    <Section maxWidth="lg">
      Recently viewed items
      {products.map((p) => (
        <Link variant="h6" key={p.name} href={'/' + p.slug} hover>
          {p.name}
        </Link>
      ))}
    </Section>
  )
}
