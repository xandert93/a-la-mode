import { Form, SearchInputAdornment } from '@/components'
import { TextField } from '@mui/material'

const styles = {
  form: {
    display: 'flex',
  },

  'text-field': {
    width: 200,
    justifyContent: 'center',
  },

  'input-base': {
    paddingRight: 'initial',
    borderRadius: 1,
  },

  input: {
    padding: '10px 12px',
  },
}

export const HeaderSearchForm = () => {
  const handleSubmit = () => {
    alert('Eurgh...you just made me search 👄')
  }

  return (
    <Form sx={styles.form} onSubmit={handleSubmit}>
      <TextField
        variant="filled"
        placeholder="Search"
        sx={styles['text-field']}
        InputProps={{
          sx: styles['input-base'],
          disableUnderline: true,
          endAdornment: <SearchInputAdornment />,
        }}
        inputProps={{ sx: styles.input }}
      />
    </Form>
  )
}
