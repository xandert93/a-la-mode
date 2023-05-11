import { useEffect } from 'react'

export const useEffectOnMount = (cb) => {
  useEffect(cb, [])
}
