import { popularProducts } from '@/data'
import { ProductPreviewsSection } from './ProductPreviewsSection'

export const PopularProductsSection = () => {
  return (
    <ProductPreviewsSection
      type="trending"
      title="Our customers are loving these right now"
      products={popularProducts}
    />
  )
}
