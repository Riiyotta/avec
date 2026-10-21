import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { Stars } from './Icons'

export const appStoreReviews = [
  { title: 'Way better than Gmail!', score: 5, author: 'soda_cowboy', body: 'I can’t believe how smooth this app runs. Really terrific ai integration too. Excited to see how it develops.' },
  { title: 'Fast, thoughtful, and delightful', score: 5, author: 'JamesL55', body: 'I’ve been using Avec throughout the beta, and it quickly became my default email app. The experience is fast, focused, and thoughtfully designed in a way that makes other email apps feel slow by comparison. This is one of the few email apps that actually makes email feel lighter.' },
  { title: 'The only way to handle email', score: 5, author: 'evntylr', body: 'Email has always been awful. I monitor 8 email accounts, and it sucks. I have tried every single product in the category, and Avec is the very first that has actually made a difference; I don’t think I can go back to regular email. I can’t wait to see what is next from the Avec team!' },
  { title: 'The best email app', score: 5, author: 'BUGGSSSSSS!!!!!', body: 'Avec makes managing your inbox insanely easy. Some of my favorite features are notifications that include a really accurate summary so a new message is glanceable and the ability to speak when drafting or searching.' },
  { title: 'Smoothest emailing experience', score: 5, author: 'Rudraksh Awasthi', body: 'With all the emailing apps stuck in 2015, avec makes that experience smoother and more modern. Love the miscellaneous emails at the end of the stack and the most convenient unsubscribe feature.' },
  { title: 'Hate managing email? Me too!', score: 5, author: 'Vahwdsss', body: 'Avec has saved me so much time managing email. It’s easily the best email app out there and I’ve tried them all. I’m sure Superhuman wishes they were Avec.' },
]

function Review({ title, score = 5, author, body, className }) {
  return (
    <article className={cn('relative flex w-full flex-col gap-1 text-black/50', className)}>
      <h3 className="text-lg font-medium tracking-tighter">{title}</h3>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex text-black opacity-50">
          <Stars score={score} size={20} />
        </span>
        <p className="text-body tracking-tighter">{author}</p>
      </div>
      <p className="text-body tracking-tighter text-pretty">{body}</p>
    </article>
  )
}

// Ported from ReviewsCarousel in 0rp2cat0iqwyz.js.
export default function ReviewsCarousel({ pixelsPerSecond = 800, pauseMs = 5000, className }) {
  const viewport = useRef(null)
  const track = useRef(null)
  const n = appStoreReviews.length
  const [reps, setReps] = useState(3)
  const hovering = useRef(false)
  const metrics = useRef({ step: 0, cardWidth: 0 })
  const indexRef = useRef(n)
  const recenter = useRef(null)

  useLayoutEffect(() => {
    const vp = viewport.current
    const tr = track.current
    if (!vp || !tr) return
    const measure = () => {
      const w = vp.offsetWidth
      const kids = tr.children
      if (kids.length < 2 || w === 0) return
      const first = kids[0]
      const step = kids[1].offsetLeft - first.offsetLeft
      const cardWidth = first.offsetWidth
      const cycle = step * n
      if (cycle === 0) return
      metrics.current = { step, cardWidth }
      const want = Math.max(3, 3 + Math.ceil(w / cycle))
      setReps((r) => (r === want ? r : want))
      recenter.current?.()
      const gap = Math.max(0, step - cardWidth)
      const left = (w - cardWidth) / 2
      const right = w - left
      const a = gap + 0
      const g = Math.min(left, Math.max(0, left - a - 280))
      const f = Math.max(right, Math.min(w, right + a + 280))
      const v = Math.min(left, g + 280)
      const b = Math.max(right, f - 280)
      const mask = `linear-gradient(to right, transparent ${g}px, black ${v}px, black ${b}px, transparent ${f}px)`
      vp.style.webkitMaskImage = mask
      vp.style.maskImage = mask
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(vp)
    ro.observe(tr)
    return () => ro.disconnect()
  }, [n])

  useLayoutEffect(() => {
    const vp = viewport.current
    const tr = track.current
    if (!vp || !tr) return
    const kids = tr.children
    if (kids.length < 2 * n) return
    if (!metrics.current.step) {
      const first = kids[0]
      const step = kids[1].offsetLeft - first.offsetLeft
      if (!step) return
      metrics.current = { step, cardWidth: first.offsetWidth }
    }
    let timer
    let disposed = false
    let idx = indexRef.current
    const setIdx = (i) => {
      idx = i
      indexRef.current = i
    }
    const targetX = (i) => vp.offsetWidth / 2 - (i * metrics.current.step + metrics.current.cardWidth / 2)
    const indexAt = (x) => (vp.offsetWidth / 2 - metrics.current.cardWidth / 2 - x) / metrics.current.step
    const currentX = () => {
      const t = getComputedStyle(tr).transform
      return t && t !== 'none' ? new DOMMatrixReadOnly(t).m41 : targetX(idx)
    }
    const apply = (x, ms) => {
      tr.style.transition = ms ? `transform ${ms}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none'
      tr.style.transform = `translate3d(${x}px, 0, 0)`
    }
    const goTo = (i) => {
      if (timer) clearTimeout(timer)
      const dur = Math.max(220, (Math.abs(targetX(i) - currentX()) / pixelsPerSecond) * 1000)
      setIdx(i)
      apply(targetX(idx), dur)
      timer = setTimeout(() => {
        if (disposed) return
        let j = idx
        while (j >= 2 * n) j -= n
        while (j < n) j += n
        if (j !== idx) {
          setIdx(j)
          apply(targetX(idx), 0)
          tr.offsetWidth
        }
        timer = setTimeout(autoAdvance, pauseMs)
      }, dur)
    }
    function autoAdvance() {
      if (disposed) return
      if (hovering.current) {
        timer = setTimeout(autoAdvance, 250)
        return
      }
      goTo(idx + 1)
    }
    let dragging = false
    let moved = false
    let startX = 0
    let startY = 0
    let startTx = 0
    const onMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      if (!moved) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
        if (Math.abs(dy) > Math.abs(dx)) {
          stopDrag()
          timer = setTimeout(autoAdvance, pauseMs)
          return
        }
        moved = true
      }
      e.preventDefault()
      apply(startTx + dx, 0)
    }
    const onUp = (e) => {
      if (!dragging) return
      const dx = e.clientX - startX
      stopDrag()
      if (moved) {
        const base = Math.round(indexAt(startTx))
        const max = n - 1
        goTo(Math.max(base - max, Math.min(base + max, Math.round(indexAt(startTx + dx)))))
      } else {
        const rect = vp.getBoundingClientRect()
        const off = e.clientX - (rect.left + rect.width / 2)
        if (Math.abs(off) > metrics.current.cardWidth / 2) goTo(idx + (off > 0 ? 1 : -1))
        else timer = setTimeout(autoAdvance, pauseMs)
      }
    }
    const stopDrag = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      dragging = false
    }
    const onDown = (e) => {
      if (e.button === 0 || e.pointerType !== 'mouse') {
        if (timer) clearTimeout(timer)
        dragging = true
        moved = false
        startX = e.clientX
        startY = e.clientY
        startTx = currentX()
        window.addEventListener('pointermove', onMove, { passive: false })
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointercancel', onUp)
      }
    }
    vp.addEventListener('pointerdown', onDown)
    recenter.current = () => {
      if (!dragging) apply(targetX(idx), 0)
    }
    apply(targetX(idx), 0)
    timer = setTimeout(autoAdvance, pauseMs)
    return () => {
      disposed = true
      recenter.current = null
      vp.removeEventListener('pointerdown', onDown)
      stopDrag()
      if (timer) clearTimeout(timer)
    }
  }, [reps, n, pixelsPerSecond, pauseMs])

  const items = Array.from({ length: reps }).flatMap(() => appStoreReviews)
  return (
    <div ref={viewport} onMouseEnter={() => (hovering.current = true)} onMouseLeave={() => (hovering.current = false)} className={cn('relative cursor-grab touch-pan-y select-none overflow-hidden', 'active:cursor-grabbing', className)}>
      <ul className="sr-only">
        {appStoreReviews.map((r, i) => (
          <li key={i}>
            {r.title}. {r.score ?? 5} out of 5 stars. {r.author}. {r.body}
          </li>
        ))}
      </ul>
      <ul ref={track} aria-hidden="true" className="flex w-max gap-8 md:gap-12">
        {items.map((r, i) => (
          <li key={i} className="w-[320px] shrink-0 md:w-[400px]">
            <Review {...r} />
          </li>
        ))}
      </ul>
    </div>
  )
}
