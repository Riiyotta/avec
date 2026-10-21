import { useCallback, useEffect, useRef, useState } from 'react'
import { REMEASURE_SCROLL_STOPS, getScrollStops, nearestStopIndex, stopProgress } from '../lib/scroll'

const FRAMES = [
  'frame-01.057mo71r_kzoc.png',
  'frame-02.2l-jfx3bv0y3-.png',
  'frame-03.058avsjh2p5fe.png',
  'frame-04.0tdb2whq9nu4o.png',
  'frame-05.2sw59hmd09wal.png',
  'frame-06.3oqwt-xl6tvvg.png',
  'frame-07.1_4a3viagqq9b.png',
  'frame-08.3kyq836e8ltsb.png',
  'frame-09.1uxdhsraadlo0.png',
  'frame-10.0mrmxonb-o2am.png',
  'frame-11.2_f-nio97wlc3.png',
  'frame-12.38dfs3qovupn0.png',
  'frame-13.40b71d731h5qb.png',
].map((f) => `/assets/frames/${f}`)

export default function ScrollProgressDots() {
  const frames = FRAMES
  const dotRefs = useRef([])
  const rootRef = useRef(null)
  const stopsRef = useRef([])
  const [hovered, setHovered] = useState(0)
  const [tipTop, setTipTop] = useState(0)

  const onHover = useCallback((i) => {
    setHovered(i)
    const el = dotRefs.current[i]
    if (el) setTipTop(el.offsetTop + el.offsetHeight / 2)
  }, [])

  const jump = useCallback((i) => {
    const root = rootRef.current
    const stop = stopsRef.current[i]
    if (root && stop) root.scrollTo({ top: stop.top, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const root = document.querySelector('[data-scroll-root]')
    if (!root) return
    rootRef.current = root
    let raf = 0
    const measureStops = () => {
      stopsRef.current = getScrollStops(root)
    }
    const paint = () => {
      const { index, fraction } = stopProgress(stopsRef.current, root.scrollTop)
      for (let i = 0; i < frames.length; i++) {
        const btn = dotRefs.current[i]
        if (!btn) continue
        const span = btn.firstElementChild
        if (!span) continue
        const o = i <= index ? 1 : i === index + 1 ? 0.1 + 0.9 * fraction : 0.1
        span.style.opacity = String(o)
        btn.setAttribute('aria-current', i === index ? 'step' : 'false')
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(paint)
    }
    let pending = null
    const onKey = (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      e.preventDefault()
      const stops = stopsRef.current
      const dir = e.key === 'ArrowDown' ? 1 : -1
      let cur
      if (pending !== null) {
        root.scrollTo({ top: pending, behavior: 'instant' })
        cur = nearestStopIndex(stops, pending)
      } else cur = nearestStopIndex(stops, root.scrollTop)
      const next = stops[Math.max(0, Math.min(stops.length - 1, cur + dir))]
      if (next) {
        pending = next.top
        root.scrollTo({ top: next.top, behavior: 'smooth' })
      }
    }
    const onEnd = () => {
      pending = null
    }
    const remeasure = () => {
      measureStops()
      paint()
    }
    const ro = new ResizeObserver(remeasure)
    ro.observe(root)
    for (const child of Array.from(root.children)) ro.observe(child)
    window.addEventListener(REMEASURE_SCROLL_STOPS, remeasure)
    root.addEventListener('scroll', onScroll, { passive: true })
    root.addEventListener('scrollend', onEnd)
    document.addEventListener('keydown', onKey)
    measureStops()
    paint()
    return () => {
      ro.disconnect()
      window.removeEventListener(REMEASURE_SCROLL_STOPS, remeasure)
      root.removeEventListener('scroll', onScroll)
      root.removeEventListener('scrollend', onEnd)
      document.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
      rootRef.current = null
    }
  }, [frames.length])

  const frame = frames[hovered] ?? frames[0]
  return (
    <div data-scroll-progress-dots="true" className="group/dots hidden md:flex fixed flex-col top-1/2 -translate-y-1/2 translate-x-1/2 right-2 [@media(min-width:1220px)]:right-6 z-50 p-2">
      <div
        role="tooltip"
        aria-hidden="true"
        style={{ top: tipTop, width: 200 }}
        className="absolute right-full mr-2 -translate-y-1/2 pointer-events-none rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-background opacity-0 scale-75 blur-lg group-has-[button:hover]/dots:opacity-100 group-has-[button:hover]/dots:scale-100 group-has-[button:hover]/dots:blur-none transition-[opacity,scale,filter] duration-120 ease-in group-has-[button:hover]/dots:ease-out"
      >
        <img src={frame} alt={`Section ${hovered + 1} preview`} style={{ width: '100%', height: 'auto' }} draggable={false} />
      </div>
      {frames.map((_, i) => (
        <button
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el
          }}
          onClick={() => jump(i)}
          onMouseEnter={() => onHover(i)}
          className="group/dot relative py-0.5 cursor-pointer"
        >
          <span className={`block size-1.5 rounded-[3px] backdrop-invert saturate-0 brightness-1000 group-hover/dots:w-4 group-hover/dots:h-2.5 group-hover/dot:opacity-50! transition-[height,width] ${i === 0 ? 'opacity-100' : 'opacity-10'}`} />
          <span className="sr-only">Scroll to section {i + 1}</span>
        </button>
      ))}
    </div>
  )
}
