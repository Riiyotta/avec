import { useEffect, useState } from 'react'

// Ported from module 53217 in the original bundle (0rp2cat0iqwyz.js).

export function useScrollApproach(ref, opts) {
  const [value, setValue] = useState(0)
  const startAt = opts?.startAt ?? 0.5
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const measure = () => {
      const rect = el.getBoundingClientRect()
      const start = startAt * window.innerHeight
      if (rect.top <= 0) setValue(1)
      else if (rect.top >= start) setValue(0)
      else setValue(1 - rect.top / start)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    const target = el.closest('[data-scroll-root]') ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    measure()
    return () => {
      target.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref, startAt])
  return value
}

export function useScrollFloat(ref, steps, opts) {
  const [value, setValue] = useState(-1)
  const snap = opts?.snap ?? false
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let cleanupSnap
    let raf = 0
    const root = el.closest('[data-scroll-root]')
    const target = root ?? window
    const compute = () => {
      const rect = el.getBoundingClientRect()
      if (rect.top > 0) return null
      const range = rect.height - window.innerHeight
      if (range <= 0) return null
      return Math.max(0, Math.min(1, -rect.top / range)) * steps
    }
    const update = () => setValue(compute() ?? -1)
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    target.addEventListener('scroll', onScroll, { passive: true })
    if (snap) {
      let t0
      const initial = compute()
      let lastStep = initial !== null ? Math.round(initial) : 0
      let locked = false
      const onEnd = () => {
        const f = compute()
        if (f === null) return
        const nearest = Math.round(f)
        if (Math.abs(f - nearest) < 0.05) {
          lastStep = nearest
          locked = false
          clearTimeout(t0)
          return
        }
        if (locked) return
        const delta = f - lastStep
        const goTo = (step) => {
          const rect = el.getBoundingClientRect()
          const range = rect.height - window.innerHeight
          if (range <= 0) return
          const diff = (step / steps - Math.max(0, Math.min(1, -rect.top / range))) * range
          if (Math.abs(diff) < 1) return
          locked = true
          lastStep = step
          clearTimeout(t0)
          t0 = setTimeout(() => {
            locked = false
          }, 800)
          const top = (root ? root.scrollTop : window.scrollY) + diff
          target.scrollTo({ top, behavior: 'smooth' })
        }
        goTo(delta > 0.15 ? Math.min(steps, lastStep + 1) : delta < -0.15 ? Math.max(0, lastStep - 1) : lastStep)
      }
      if ('onscrollend' in window) {
        target.addEventListener('scrollend', onEnd)
        cleanupSnap = () => {
          target.removeEventListener('scrollend', onEnd)
          clearTimeout(t0)
        }
      } else {
        let t1
        const debounced = () => {
          clearTimeout(t1)
          t1 = setTimeout(onEnd, 150)
        }
        target.addEventListener('scroll', debounced, { passive: true })
        cleanupSnap = () => {
          target.removeEventListener('scroll', debounced)
          clearTimeout(t1)
          clearTimeout(t0)
        }
      }
    }
    update()
    return () => {
      target.removeEventListener('scroll', onScroll)
      cleanupSnap?.()
      cancelAnimationFrame(raf)
    }
  }, [ref, steps, snap])
  return value
}

export function useScrollProgress(ref, count) {
  const [value, setValue] = useState(-1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const measure = () => {
      const rect = el.getBoundingClientRect()
      if (rect.top > 0) {
        setValue(-1)
        return
      }
      const range = rect.height - window.innerHeight
      if (range <= 0) return
      setValue(Math.min(count - 1, Math.round(Math.max(0, Math.min(1, -rect.top / range)) * (count - 1))))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    const target = el.closest('[data-scroll-root]') ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    measure()
    return () => {
      target.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref, count])
  return value
}
