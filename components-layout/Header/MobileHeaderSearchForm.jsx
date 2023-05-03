import { Form, SearchInputAdornment } from '@/components'
import { InputBase } from '@mui/material'

const styles = {
  form: {
    flexGrow: 1,
  },
}

export const MobileHeaderSearchForm = () => {
  const handleSubmit = () => {
    alert('Eurgh...you just made me search 👄')
  }

  return (
    <Form onSubmit={handleSubmit} sx={styles.form}>
      <InputBase
        fullWidth
        placeholder="Search our products and brands"
        endAdornment={<SearchInputAdornment />}
      />
    </Form>
  )
}
