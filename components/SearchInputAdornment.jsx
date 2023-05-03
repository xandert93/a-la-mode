import { Search } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'

export const SearchInputAdornment = () => {
  return (
    <InputAdornment position="end">
      <IconButton
        size="small"
        type="submit"
        disabled={false} // eventually update
        children={<Search /*  sx={sx.icon} */ />}
      />
    </InputAdornment>
  )
}
