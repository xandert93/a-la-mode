const { format } = new Intl.NumberFormat('en-GB', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'GBP',
})

export const formatCurrency = (num) => format(num / 100)
