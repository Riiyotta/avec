import { useEffect, useMemo, useRef, useState } from 'react'

// Ported from module 10523 (WordReveal). 25ms per word in discrete mode, per-character when `progress` is given.
export default function WordReveal({ text, revealLevel, requiredLevel, wordOffset = 0, reverseWordOffset = 0, variant = 'dark', progress, forceComplete = false, dimmedOpacity }) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const done = useRef(false)
  const active = revealLevel >= requiredLevel
  const past = revealLevel > requiredLevel

  useEffect(() => {
    countRef.current = count
  }, [count])

  useEffect(() => {
    if (progress !== undefined) return
    let interval
    if (active) {
      if (past || done.current || forceComplete) {
        done.current = true
        setCount(words.length)
        return
      }
      const start = setTimeout(() => {
        let n = countRef.current + 1
        setCount(n)
        interval = setInterval(() => {
          setCount(++n)
          if (n >= words.length) {
            done.current = true
            clearInterval(interval)
          }
        }, 25)
      }, 25 * wordOffset)
      return () => {
        clearTimeout(start)
        clearInterval(interval)
      }
    }
    done.current = false
    let n = countRef.current
    if (n <= 0) {
      setCount(0)
      return
    }
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount(Math.max(0, --n))
        if (n <= 0) clearInterval(interval)
      }, 25)
    }, 25 * reverseWordOffset)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [active, past, words.length, wordOffset, reverseWordOffset, progress, forceComplete])

  const alpha = dimmedOpacity ?? (variant === 'light' ? 0.5 : 0.15)
  const dim = variant === 'light' ? `oklch(1 0 0 / ${alpha})` : `oklch(0 0 0 / ${alpha})`
  const full = variant === 'light' ? 'oklch(1 0 0)' : 'oklch(0 0 0)'

  if (progress !== undefined) {
    const chars = Array.from(text)
    const n = Math.round(Math.max(0, Math.min(1, progress)) * chars.length)
    return (
      <>
        {chars.map((c, i) => (
          <span key={i} className="word-reveal-span" style={{ color: i < n ? full : dim }}>
            {c}
          </span>
        ))}
      </>
    )
  }
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="word-reveal-span" style={{ color: i < count ? full : dim }}>
          {i > 0 ? ' ' : ''}
          {w}
        </span>
      ))}
    </>
  )
}
