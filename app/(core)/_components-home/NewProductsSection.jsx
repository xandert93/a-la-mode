import { newProducts } from '@/data'
import { ProductPreviewsSection } from './ProductPreviewsSection'

export const NewProductsSection = () => {
  return (
    <ProductPreviewsSection
      type="new additions"
      title="Browse our latest arrivals"
      products={newProducts}
    />
  )
}
