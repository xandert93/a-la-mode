import { useState } from 'react'

export const useToggle = (initialBool = false) => {
  const [value, setValue] = useState(initialBool)

  const toggle = (val?: boolean) => {
    setValue((prev) => (typeof val === 'boolean' ? val : !prev))
  }

  return [value, toggle]
}
