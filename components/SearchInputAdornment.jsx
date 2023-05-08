import { SearchIcon } from './index'
import { IconButton, InputAdornment } from '@mui/material'

export const SearchInputAdornment = (props) => {
  return (
    <InputAdornment position="end">
      <IconButton
        size="small"
        type="submit"
        disabled={false} // eventually update
        children={<SearchIcon />}
        aria-label="Search products"
      />
    </InputAdornment>
  )
}
