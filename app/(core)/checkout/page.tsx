import { genPageTitle } from '@/utils/helpers'

export const metadata = {
  title: genPageTitle('Checkout'),
}

// If I don't want to use Stripe Checkout (portal), but integrate Stripe into FE. See other sites!
export default function CheckoutPage() {
  return 'CheckoutPage'
}
