import { useCallback, useEffect, useRef, useState } from 'react'

// Mount/visible state machine for enter/exit transitions (module `os` in the original).
export function useOverlay(open) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const raf = useRef(0)
  useEffect(() => {
    if (open) setMounted(true)
    else setVisible(false)
  }, [open])
  useEffect(() => {
    if (mounted && open) {
      raf.current = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf.current)
    }
  }, [mounted, open])
  const onTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget || open) return
      setMounted(false)
    },
    [open],
  )
  return { mounted, visible, onTransitionEnd }
}
