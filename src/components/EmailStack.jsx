import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { ReplyIcon, SwipeLabelIcon } from './Icons'

// Ported from module 32138 (EmailStack) in 2632ue434kip8.js.
const SCRIPTED = ['right', 'left']
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

function Avatar({ sender, image }) {
  if (image) return <img src={image} alt={sender} width="36" height="36" decoding="async" className="size-9 shrink-0 rounded-full object-cover" style={{ color: 'transparent' }} />
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-alt font-inter">
      <span className="text-[13px] font-medium text-foreground/70">{sender.charAt(0).toUpperCase()}</span>
    </div>
  )
}

function GameLabel({ label }) {
  const done = label === 'done'
  return (
    <div className={cn('mx-3 mb-3 flex items-center justify-center gap-1.5 rounded-xl px-4 py-5.25', done ? 'bg-accent-green' : 'bg-accent-sky')}>
      <span className="text-[14px]/[20px] font-medium text-white">{done ? 'Done' : 'Later'}</span>
    </div>
  )
}

function EmailCard({ email, className, gameLabel }) {
  return (
    <div className={cn('flex flex-col overflow-hidden rounded-[20px] bg-white font-inter shadow-[0_0_0_0.33px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.06)]', className)}>
      <div className="relative flex flex-1 flex-col gap-4 overflow-hidden px-4 pt-4 pb-1">
        <p className="text-[18px]/[28px] font-medium tracking-tight text-[#403e3c]">{email.subject}</p>
        <div className="flex items-center gap-2">
          <Avatar sender={email.sender} image={email.image} />
          <div className="flex min-w-0 flex-1 flex-col ">
            <div className="flex items-baseline gap-1">
              <span className="flex-1 truncate text-[14px]/[20px] font-medium tracking-[-0.01em] text-[#403e3c]">{email.sender}</span>
              <span className="shrink-0 text-[12px]/[16px] tracking-[-0.01em] text-[#878580]">{email.time}</span>
            </div>
            <div className="flex items-center gap-1 text-[12px]/[16px] tracking-[-0.01em]">
              <span className="text-[#403e3c]">To:</span>
              <span className="truncate text-[#878580]">{email.to}</span>
            </div>
          </div>
        </div>
        <p className="whitespace-pre-line text-[14px]/[20px] text-[#403e3c] font-[440] tracking-[-0.01em]">{email.body}</p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-white to-transparent" />
      </div>
      {gameLabel ? (
        <GameLabel label={gameLabel} />
      ) : (
        <div className="mx-3 mb-3 flex flex-col items-center gap-0.5 rounded-xl bg-[#0682fe] px-4 py-3 ">
          <div className="flex items-center gap-1 text-[14px]/[20px] font-medium text-white">
            <ReplyIcon />
            <span>Reply</span>
          </div>
          <span className="text-[12px]/[16px] font-medium text-blue-100/70">Hold to voice compose</span>
        </div>
      )}
    </div>
  )
}

function SwipeOverlay({ direction, show, rapid, scrollOpacity }) {
  const right = direction === 'right'
  const scripted = scrollOpacity !== undefined
  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col rounded-[20px] p-5 text-white"
      style={{
        opacity: scripted ? scrollOpacity : +!!show,
        transition: scripted ? 'none' : `opacity ${rapid ? 20 : 50}ms ease-out`,
        backgroundColor: right ? '#07AA04' : '#858482',
        alignItems: right ? 'flex-start' : 'flex-end',
      }}
    >
      <SwipeLabelIcon done={right} />
      <p className="text-xl font-medium tracking-[-0.035em]">{right ? 'Done' : 'Later'}</p>
    </div>
  )
}

// easing used for the scroll-scrubbed swipe
export function swipeEase(t) {
  if (t <= 0) return 0
  const x = t / 0.82
  if (x >= 1) return 1
  let lo = 0
  let hi = 1
  for (let i = 0; i < 20; i++) {
    const m = (lo + hi) * 0.5
    m * m * (3 - 2 * m) < x ? (lo = m) : (hi = m)
  }
  const m = (lo + hi) * 0.5
  return m * m * m
}

export default function EmailStack({ emails, activeIndex, onSwipe, gameSwipes, cardLabels, isDragging = false, dragExit = false, topCardRef, topCardPreset, scrollFloat }) {
  const controlled = gameSwipes !== undefined
  const scrolled = scrollFloat !== undefined && Number.isFinite(scrollFloat) && scrollFloat >= 0 && !controlled
  const scriptedCount = scrolled ? (scrollFloat >= 2 ? 2 : +(scrollFloat >= 1)) : activeIndex >= 2 ? 2 : +(activeIndex >= 1)
  const [localSwipes, setLocalSwipes] = useState([])
  const [duration, setDuration] = useState(300)
  const [hidden, setHidden] = useState(false)
  const prevActive = useRef(activeIndex)
  const lastSwipeAt = useRef(0)

  useEffect(() => {
    if (activeIndex !== prevActive.current) {
      const fromGame = prevActive.current === 3
      prevActive.current = activeIndex
      if (fromGame && activeIndex < 3) {
        setHidden(true)
        const t = setTimeout(() => {
          setLocalSwipes([])
          setDuration(300)
          setHidden(false)
        }, 150)
        return () => clearTimeout(t)
      }
      setLocalSwipes([])
      setDuration(300)
      setHidden(false)
    }
  }, [activeIndex])

  const swipes = controlled ? gameSwipes : localSwipes
  const dirs = useMemo(() => [...SCRIPTED.slice(0, scriptedCount), ...swipes], [scriptedCount, swipes])
  const total = dirs.length
  const prevCount = useRef(gameSwipes?.length ?? 0)

  useEffect(() => {
    if (!controlled) return
    const n = gameSwipes.length
    if (n > prevCount.current) {
      const now = Date.now()
      const delta = now - lastSwipeAt.current
      lastSwipeAt.current = now
      setDuration(delta < 300 ? 150 : 300)
    }
    prevCount.current = n
  }, [gameSwipes, controlled])

  useEffect(() => {
    if (activeIndex !== 3 || controlled) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const dir = e.key === 'ArrowRight' ? 'right' : 'left'
        const now = Date.now()
        const delta = now - lastSwipeAt.current
        lastSwipeAt.current = now
        setDuration(delta < 300 ? 150 : 300)
        onSwipe?.(dir)
        setLocalSwipes((s) => [...s, dir])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, scriptedCount, onSwipe, controlled])

  const base = Math.max(0, total - 1)
  const activeScripted = scrolled && scrollFloat < 1 ? 0 : scrolled && scrollFloat < 2 ? 1 : null
  const g = activeScripted === null ? 0 : (scrollFloat ?? 0) - activeScripted
  const lift = activeScripted === null || g <= 0 ? 0 : g >= 1 ? 1 : g < 0.82 ? 0.7 * swipeEase(g) : 0.7 + 0.3 * (1 - (1 - (g - 0.82) / 0.18) ** 2)

  return (
    <div className="absolute inset-0 flex items-center justify-center [scale:var(--stack-scale,0.7)] max-md:[@media(min-height:740px)]:[scale:var(--stack-scale,0.9)] md:[scale:var(--stack-scale,1)]" style={{ opacity: +!hidden, transition: 'opacity 150ms ease' }}>
      <div className="relative isolate aspect-27/40 w-full max-w-[320px]">
        {Array.from({ length: total + 3 - base }, (_, k) => {
          const idx = base + k
          const email = emails[idx % emails.length]
          if (!email) return null
          const depth = idx - total
          const exitDir = depth < 0 ? dirs[idx] : undefined
          const lifting = activeScripted !== null && depth > 0 && idx > activeScripted
          const d = lifting ? Math.max(0, depth - lift) : Math.max(0, depth)
          const stackT = `translateY(${-8 * d}px) scale(${1 - 0.1 * d})`
          const exitT = exitDir ? (exitDir === 'right' ? 'translateX(200%) rotate(12deg)' : 'translateX(-200%) rotate(-12deg)') : ''
          const isTop = depth === 0
          let m = null
          let sDir
          if (scrolled) {
            if (idx === 0 && scrollFloat < 1) {
              m = scrollFloat
              sDir = SCRIPTED[0]
            } else if (idx === 1 && scrollFloat >= 1 && scrollFloat < 2) {
              m = scrollFloat - 1
              sDir = SCRIPTED[1]
            }
          }
          const scrubbing = m !== null && !exitT && m < 1
          const preset = isTop && topCardPreset ? (topCardPreset === 'done' ? 'translateX(40%) translateY(-3%) rotate(3deg)' : 'translateX(-40%) translateY(-3%) rotate(-3deg)') : ''
          let transform = stackT
          if (exitT) transform = `${stackT} ${exitT}`
          else if (scrubbing && sDir && m != null) {
            const e = swipeEase(Math.min(1, m))
            const sign = sDir === 'right' ? 1 : -1
            transform = `${stackT} translateX(${200 * e * sign}%) rotate(${12 * e * sign}deg)`
          } else if (preset) transform = `${stackT} ${preset}`
          const justExited = depth === -1
          const noTransition = (isTop && isDragging) || (scrubbing && sDir !== undefined) || lifting
          const opacity = lifting ? Math.max(0, Math.min(1, (2 - d - 0.25) / 0.5)) : +!(d >= 2)
          const overlayDir = exitDir ?? (scrubbing ? sDir : isTop && topCardPreset ? (topCardPreset === 'done' ? 'right' : 'left') : undefined)
          const scrollOpacity = isTop && scrubbing && m != null ? (m <= 0.05 ? 0 : m >= 0.1 ? 1 : (m - 0.05) / 0.05) : undefined
          return (
            <div
              key={idx}
              ref={isTop ? topCardRef : undefined}
              className="absolute inset-0 origin-top"
              style={{
                zIndex: -depth,
                transform,
                transitionProperty: noTransition ? 'none' : 'transform, opacity',
                transitionDuration: `${justExited && dragExit ? 300 : duration}ms`,
                transitionTimingFunction: `${justExited ? (dragExit ? 'cubic-bezier(0, 0, 0.58, 1)' : 'cubic-bezier(0.1, 0.3, 1, 0)') : EASE}, ${EASE}`,
                transitionDelay: `${justExited ? 0 : Math.round(0.06 * duration)}ms`,
                opacity,
              }}
            >
              <EmailCard email={email} className="h-full w-full select-none" gameLabel={cardLabels ? cardLabels[idx % cardLabels.length] : undefined} />
              <SwipeOverlay direction={overlayDir} show={justExited || (isTop && !!topCardPreset) || (isTop && scrubbing && (m ?? 0) > 0.05)} scrollOpacity={scrollOpacity} rapid={duration === 150} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
