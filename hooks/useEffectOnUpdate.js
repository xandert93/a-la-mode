import { useEffect, useRef } from 'react'

// JTO - accounting for Strict Mode
export const useEffectOnUpdate = (cb, deps) => {
  const renderCountRef = useRef(0)

  useEffect(() => {
    renderCountRef.current < 2 ? renderCountRef.current++ : cb()
  }, deps)
}

const useEffectOnUpdate_old = (cb, deps) => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    isFirstRender.current ? (isFirstRender.current = false) : cb()
  }, deps)
}
