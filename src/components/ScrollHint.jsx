import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { getScrollStops, nearestStopIndex } from '../lib/scroll'

const HIDDEN_ON = new Set(['hero', 'triage_game', 'compose_record', 'search', 'notifications', 'footer'])

function Key({ direction }) {
  return <span className="border border-foreground/50 rounded-sm px-1 py-px text-[12px]/[20px] mx-0.5">{direction === 'up' ? '↑' : '↓'}</span>
}

export default function ScrollHint() {
  const [show, setShow] = useState(false)
  const timer = useRef()
  useEffect(() => {
    const root = document.querySelector('[data-scroll-root]')
    if (!root) return
    const onScroll = () => {
      clearTimeout(timer.current)
      setShow(false)
      timer.current = setTimeout(() => {
        const stops = getScrollStops(root)
        const name = stops[nearestStopIndex(stops, root.scrollTop)]?.name ?? ''
        if (!HIDDEN_ON.has(name)) setShow(true)
      }, 5000)
    }
    onScroll()
    root.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      root.removeEventListener('scroll', onScroll)
      clearTimeout(timer.current)
    }
  }, [])
  return (
    <div data-scroll-hint="true" className={cn('pointer-events-none fixed left-0 right-0 z-50 hidden md:flex justify-center transition-opacity top-[78px]', show ? 'opacity-100 duration-500' : 'opacity-0 duration-150')}>
      <p className="text-[14px]/[20px] font-medium tracking-tight text-foreground/50 animate-float">
        Scroll or use <Key direction="up" />
        <Key direction="down" /> to page through this site
      </p>
    </div>
  )
}
