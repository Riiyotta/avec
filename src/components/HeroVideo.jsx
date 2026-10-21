import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { PauseIcon, PlayIcon, ReplayIcon } from './Icons'

const FREEZE_OFFSET = 2 / 60

// Ported from module 85945 (HeroVideo).
export default function HeroVideo() {
  const triage = useRef(null)
  const waves = useRef(null)
  const [ended, setEnded] = useState(false)
  const wavesStarted = useRef(false)
  const endedRef = useRef(false)
  const userInteracted = useRef(false)
  const [paused, setPaused] = useState(false)

  const startWaves = useCallback(() => {
    if (wavesStarted.current) return
    wavesStarted.current = true
    waves.current?.play().catch(() => {})
  }, [])

  useEffect(() => {
    const v = triage.current
    if (!v) return
    const t = setTimeout(() => {
      if (!userInteracted.current) v.play().catch(() => setPaused(true))
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const v = triage.current
    if (!v) return
    let raf = 0
    const tick = () => {
      if (!v.paused && v.duration > 0) {
        const ct = v.currentTime
        if (ct >= v.duration - 6) startWaves()
        if (!endedRef.current && ct >= v.duration - 1.4) {
          endedRef.current = true
          setEnded(true)
        }
        if (ct >= v.duration - FREEZE_OFFSET) {
          v.currentTime = v.duration - FREEZE_OFFSET
          v.pause()
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [startWaves])

  useEffect(() => {
    if (ended) return
    const t = setTimeout(() => {
      const w = waves.current
      if (w) {
        w.pause()
        w.currentTime = 0
      }
    }, 1000)
    return () => clearTimeout(t)
  }, [ended])

  const scrollDown = useCallback(() => {
    const root = document.querySelector('[data-scroll-root]')
    root?.scrollTo({ top: root.clientHeight, behavior: 'smooth' })
  }, [])

  const onButton = useCallback(() => {
    const v = triage.current
    if (!v) return
    userInteracted.current = true
    if (endedRef.current) {
      setEnded(false)
      endedRef.current = false
      wavesStarted.current = false
      setPaused(false)
      v.currentTime = 0
      v.play()
      return
    }
    if (paused) {
      v.play().catch(() => setPaused(true))
      return
    }
    v.pause()
    setPaused(true)
  }, [paused])

  return (
    <div className="relative aspect-square w-full max-md:h-full max-md:w-auto max-md:max-w-full short-phone:h-auto short-phone:w-full md:max-w-[calc(100dvh-122px)] overflow-hidden rounded-4xl bg-brand shadow-lg">
      <video
        ref={triage}
        src="/assets/hero-triage.mp4"
        poster="/assets/hero-triage-poster.webp"
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onEnded={() => {
          const v = triage.current
          if (v) {
            v.currentTime = v.duration - FREEZE_OFFSET
            startWaves()
            endedRef.current = true
            setEnded(true)
          }
        }}
      />
      <video
        ref={waves}
        src="/assets/hero-waves.mp4"
        poster="/assets/hero-waves-poster.webp"
        className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-1000', ended ? 'opacity-100' : 'opacity-0')}
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className={cn('pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-1000', ended ? 'opacity-100' : 'opacity-0')}>
        <button onClick={scrollDown} disabled={!ended} className="pointer-events-auto flex cursor-pointer items-center gap-1.5 rounded-full bg-black/55 px-4 py-2 text-[14px]/[20px] font-medium tracking-tight text-white backdrop-blur-sm">
          Scroll to learn more
          <span className="rounded-sm border border-white/60 px-1 py-px text-[12px]/[16px]">↓</span>
        </button>
      </div>
      <button onClick={onButton} aria-label={ended ? 'Replay video' : paused ? 'Play video' : 'Pause video'} className="cursor-pointer absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
        {ended ? <ReplayIcon className="h-5 w-5" /> : paused ? <PlayIcon className="h-5 w-5" /> : <PauseIcon className="h-5 w-5" />}
      </button>
    </div>
  )
}
