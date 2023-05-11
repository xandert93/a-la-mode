import { useEffect, useRef } from 'react'

export const useEffectOnUpdate = (cb, deps) => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    isFirstRender.current ? (isFirstRender.current = false) : cb()
  }, deps)
}
