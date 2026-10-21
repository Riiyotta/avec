import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react'
import { cn } from '../lib/cn'
import { content } from '../content'
import { useScrollProgress } from '../hooks/useScroll'
import { useIosHaptics } from '../hooks/useIosHaptics'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { track } from '../lib/analytics'
import { SearchIcon } from './Icons'
import WordReveal from './WordReveal'

// Ported from ExpandSection (module 61541) in 0rp2cat0iqwyz.js.
// Phone-video segment timestamps (seconds), verbatim from the original.
const T_RECORD_END = 3 + 0.6333333333333333
const T_DICTATION_PAUSE = 4 + 0.36666666666666664
const T_DICTATION_END = 5 + 0.4166666666666667
const T_LEARN_END = 6 + 0.16666666666666666

const noop = () => {}
const play = (v) => {
  v.play().catch(noop)
}
function seekThenPlay(v, t) {
  let cancelled = false
  v.currentTime = t
  const go = () => {
    if (!cancelled) v.play().catch(noop)
  }
  v.seeking ? v.addEventListener('seeked', go, { once: true }) : go()
  return () => {
    cancelled = true
    v.removeEventListener('seeked', go)
  }
}
function keepPlaying(v) {
  !v.paused || v.seeking || v.ended || v.play().catch(noop)
}

const px = (n) => `${2 * n}px`
const GLASS = `0 ${px(-1)} ${px(2)} ${px(-1)} rgba(0, 0, 0, 0.08) inset, 0 ${px(1)} ${px(1)} ${px(-1)} rgba(0, 0, 0, 0.08), 0 ${px(2)} ${px(2)} ${px(-1)} rgba(0, 0, 0, 0.08), 0 ${px(4)} ${px(4)} ${px(-4)} #FFF inset, 0 ${px(2)} ${px(1)} ${px(-2)} #FFF inset`

function WaveVideo({ isMobile }) {
  const ref = useCallback((el) => {
    el && el.play().catch(Boolean)
  }, [])
  return (
    <video
      key={isMobile ? 'm' : 'd'}
      ref={ref}
      poster={isMobile ? '/assets/wave_mobile-poster.webp' : '/assets/wave_desktop-poster.webp'}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      className="h-full w-full object-cover"
    >
      {isMobile ? (
        <>
          <source src="/assets/wave_mobile_hevc.mp4" type='video/mp4; codecs="hvc1"' />
          <source src="/assets/wave_mobile.webm" type="video/webm" />
        </>
      ) : (
        <>
          <source src="/assets/wave_desktop_hevc.mp4" type='video/mp4; codecs="hvc1"' />
          <source src="/assets/wave_desktop.webm" type="video/webm" />
        </>
      )}
    </video>
  )
}

function useDelayedVisible(active, delay, index) {
  const [shown, setShown] = useState(active)
  const prev = useRef(index)
  useEffect(() => {
    const backwards = index < prev.current
    prev.current = index
    if (active) {
      const t = setTimeout(() => setShown(true), backwards ? 150 : delay)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShown(false), 150)
    return () => clearTimeout(t)
  }, [active, delay, index])
  return shown
}

function Caption({ index, text, text2, position, maxWidth, delay, variant, activeIndex }) {
  const active = activeIndex === index
  const shown = useDelayedVisible(active, delay, activeIndex)
  const wordCount = useMemo(() => text.split(/\s+/).filter(Boolean).length, [text])
  const level = shown ? 0 : -1
  return (
    <div
      className={cn(
        'absolute left-1/2 z-1 w-full -translate-x-1/2 px-3 md:px-6 text-center transition-opacity duration-150 text-balance md:text-wrap',
        'top' in position ? '-translate-y-1/2' : 'translate-y-1/2',
        active || (index === 0 && activeIndex === -1) ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      style={{ ...position, maxWidth }}
    >
      <p
        className={cn(
          'type-body-lg md:[@media(max-height:700px)]:type-body md:[@media(max-height:700px)]:tracking-tight',
          index === 0 && 'max-md:translate-y-[4dvh]',
          (index === 2 || index === 3) && 'max-md:[@media(min-height:768px)]:translate-y-[4dvh]',
        )}
      >
        <WordReveal text={text} revealLevel={level} requiredLevel={0} variant={variant} />
        {text2 && (
          <>
            {' '}
            <WordReveal text="u" wordOffset={wordCount + 5} revealLevel={level} requiredLevel={0} variant={variant} />
            <WordReveal text="h" wordOffset={wordCount + 10} revealLevel={level} requiredLevel={0} variant={variant} />
            <WordReveal text="h" wordOffset={wordCount + 15} revealLevel={level} requiredLevel={0} variant={variant} />
            <WordReveal text="h" wordOffset={wordCount + 20} revealLevel={level} requiredLevel={0} variant={variant} />{' '}
            <WordReveal text={text2} revealLevel={level} requiredLevel={0} variant={variant} wordOffset={wordCount + 25} />
          </>
        )}
      </p>
    </div>
  )
}

const ease = 'cubic-bezier(0.4, 0, 0.2, 1)'

export default function Expand() {
  const copy = content
  const search = copy.search
  const notif = copy.notifications
  const captions = [
    { index: 0, text: copy.expand.reply, position: { top: '10%' }, maxWidth: 700, delay: 0, variant: 'dark' },
    { index: 1, text: copy.expand.dictation, text2: copy.expand.dictationCont, position: { bottom: 'var(--dictation-caption-bottom, 20%)' }, maxWidth: 760, delay: 900, variant: 'light' },
    { index: 2, text: copy.expand.learn, position: { top: '10%' }, maxWidth: 720, delay: 733, variant: 'light' },
    { index: 3, text: copy.expand.triage, position: { top: '10%' }, maxWidth: 680, delay: 700, variant: 'light' },
  ]
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [phoneReady, setPhoneReady] = useState(false)
  const stageRef = useRef(null)
  const phoneRef = useRef(null)
  const B = useScrollProgress(sectionRef, 7)
  const prevB = useRef(B)
  const interacted = useRef(false)

  // Prime the phone video when it nears the viewport.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    interacted.current = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          v.currentTime = 0
          v.play()
            .then(() => {
              if (!interacted.current) v.pause()
            })
            .catch(noop)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(v)
    return () => {
      interacted.current = true
      io.disconnect()
    }
  }, [])

  // Time-scrub the phone video by state.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const before = prevB.current
    prevB.current = B
    const backwards = B < before
    if (B > 0) interacted.current = true
    let raf = 0
    let cancelled = false
    if (B <= 0) {
      v.pause()
      if (before > 0) v.currentTime = 0
      return
    }
    if (B === 1) {
      if (backwards) v.currentTime = 0.65
      play(v)
      const loop = () => {
        if (cancelled) return
        if (v.currentTime >= T_RECORD_END) v.currentTime = 0.65
        keepPlaying(v)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      return () => {
        cancelled = true
        cancelAnimationFrame(raf)
      }
    }
    if (B === 2) {
      if (backwards) {
        v.currentTime = T_DICTATION_END
        v.pause()
        return
      }
      const undo = seekThenPlay(v, T_RECORD_END)
      let timer = null
      let resumed = false
      const loop = () => {
        if (cancelled) return
        if (!resumed && v.currentTime >= T_DICTATION_PAUSE) {
          v.pause()
          timer = setTimeout(() => {
            if (cancelled) return
            resumed = true
            play(v)
            raf = requestAnimationFrame(loop)
          }, 500)
          return
        }
        if (resumed && v.currentTime >= T_DICTATION_END) return void v.pause()
        keepPlaying(v)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      return () => {
        cancelled = true
        cancelAnimationFrame(raf)
        undo()
        timer && clearTimeout(timer)
      }
    }
    if (B === 3) {
      if (backwards) {
        v.currentTime = T_LEARN_END
        v.pause()
        return
      }
      const undo = seekThenPlay(v, T_DICTATION_END)
      const loop = () => {
        if (cancelled) return
        if (v.currentTime >= T_LEARN_END) return void v.pause()
        keepPlaying(v)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      return () => {
        cancelled = true
        cancelAnimationFrame(raf)
        undo()
      }
    }
    if (B === 4) {
      if (backwards) {
        v.currentTime = v.duration || T_LEARN_END
        v.pause()
        return
      }
      const undo = seekThenPlay(v, T_LEARN_END)
      const loop = () => {
        if (cancelled || v.ended) return
        keepPlaying(v)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      return () => {
        cancelled = true
        cancelAnimationFrame(raf)
        undo()
      }
    }
    v.pause()
  }, [B])

  const isMobile = useMediaQuery('(max-width: 768px)')
  const haptics = useIosHaptics()
  const waveHost = useRef(null)
  const [waveLoaded, setWaveLoaded] = useState(false)
  useEffect(() => {
    const el = waveHost.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setWaveLoaded(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [waveHost])

  const prevForBtn = useRef(B)
  const goingForward = B > prevForBtn.current
  useEffect(() => {
    prevForBtn.current = B
  }, [B])

  const isRecord = B === 1
  const btnVisible = B >= 4
  const expanded = B >= 5
  const searchOn = B >= 5
  const [queryDone, setQueryDone] = useState(false)
  const [typed, setTyped] = useState(0)
  const notifOn = B >= 6
  const searchHeadlineOn = searchOn && !notifOn
  const [notifA, setNotifA] = useState(false)
  const [notifB, setNotifB] = useState(false)
  const emailCardRef = useRef(null)
  const [emailH, setEmailH] = useState(0)

  useEffect(() => {
    if (!searchOn) {
      setQueryDone(false)
      setTyped(0)
      return
    }
    const timers = []
    const at = (fn, ms) => timers.push(setTimeout(fn, ms))
    const q = search.searchQuery
    for (let i = 1; i <= q.length; i++) at(() => setTyped(i), 400 + 35 * i)
    at(() => setQueryDone(true), 400 + 35 * q.length + 400)
    return () => timers.forEach(clearTimeout)
  }, [searchOn, search.searchQuery])

  useEffect(() => {
    if (!notifOn) {
      setNotifA(false)
      setNotifB(false)
      return
    }
    const a = setTimeout(() => setNotifA(true), 80)
    const b = setTimeout(() => setNotifB(true), 260)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [notifOn])

  useLayoutEffect(() => {
    const el = emailCardRef.current
    if (!el) return
    const update = () => setEmailH(el.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Geometry CSS variables (button position over the phone's on-screen "Done" button, card clip insets).
  useEffect(() => {
    const frame = stageRef.current
    const phone = phoneRef.current
    if (!frame || !phone) return
    function measure() {
      const fr = frame.getBoundingClientRect()
      const pr = phone.getBoundingClientRect()
      if (fr.width === 0 || fr.height === 0) return
      const parent = frame.parentElement
      if (parent) frame.style.setProperty('--sf-pad-top', getComputedStyle(parent).paddingTop)
      const k = isMobile ? 1.2 : 0.88
      const s = isMobile ? 0.29 + (0.05 * window.innerHeight + 25) / pr.height : 0.225
      const cx = pr.left - fr.left + pr.width * (0.5 + (0.4944 - 0.5) * k)
      const cy = pr.top - fr.top + pr.height * (0.5 + -0.065 * k + s)
      const w = 0.3893 * pr.width * k
      const h = 0.063 * pr.height * k
      frame.style.setProperty('--btn-center-x', `${cx}px`)
      frame.style.setProperty('--btn-center-y', `${cy}px`)
      frame.style.setProperty('--btn-width', `${w}px`)
      frame.style.setProperty('--btn-height', `${h}px`)
      const top = cy - h / 2
      const left = cx - w / 2
      frame.style.setProperty('--expand-btn-inset-top', `${top}px`)
      frame.style.setProperty('--expand-btn-inset-right', `${fr.width - left - w}px`)
      frame.style.setProperty('--expand-btn-inset-bottom', `${fr.height - top - h}px`)
      frame.style.setProperty('--expand-btn-inset-left', `${left}px`)
      const stageW = fr.width + 32
      const stageH = fr.height + (isMobile ? 112 : 86)
      const off = isMobile ? 40 : 27
      const maxW = isMobile ? fr.width : parseFloat(getComputedStyle(frame).getPropertyValue('--section-max-w')) || fr.width
      const side = (stageW - Math.min(fr.width, maxW)) / 2
      const clipT = isMobile ? 56 + off : 0.122 * stageH + off
      const clipB = isMobile ? 56 - off : 0.122 * stageH - off
      frame.style.setProperty('--card-clip-t', `${clipT}px`)
      frame.style.setProperty('--card-clip-r', `${side}px`)
      frame.style.setProperty('--card-clip-b', `${clipB}px`)
      frame.style.setProperty('--card-clip-l', `${side}px`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(frame)
    ro.observe(phone)
    return () => ro.disconnect()
  }, [isMobile])

  const clipVars = 'var(--card-clip-t, 25%) var(--card-clip-r, 16px) var(--card-clip-b, 20%) var(--card-clip-l, 16px)'
  const typedQuery = [...search.searchQuery].slice(0, typed).join('')

  return (
    <section ref={sectionRef}>
      <div className="section-frame sticky top-0 h-dvh overflow-hidden bg-background pb-4" data-section-group="expand" data-section-name="compose_intro">
        <div ref={stageRef} className="relative flex-1">
          <div
            className={cn(
              'absolute left-1/2 top-1/2 flex -translate-x-1/2 justify-center px-2 items-center',
              'h-[calc(100%+112px)] md:h-[calc(100%+86px)] w-[calc(100%+32px)]',
              'translate-y-[calc(-50%-40px)] md:translate-y-[calc(-50%-27px)]',
              phoneReady ? 'md:[--dictation-phone-bottom:90.28%]' : 'md:[--dictation-phone-bottom:98.84%]',
              'md:[--dictation-caption-bottom:calc((100%-var(--dictation-phone-bottom)+24%)/2)]',
              B === 1 ? 'bg-accent-red' : B === 2 ? 'bg-brand' : B === 3 ? 'bg-accent-amber' : 'bg-surface',
            )}
            style={{
              clipPath: isRecord ? 'inset(0px 0px 0px 0px round 0px)' : `inset(${clipVars} round 20px)`,
              transition: `clip-path 500ms ${ease}, background-color 500ms ${ease}`,
            }}
          >
            <div ref={phoneRef} className="relative aspect-2/3 w-full md:w-auto md:min-h-full md:max-w-full">
              <div
                className={cn(
                  'absolute inset-0 will-change-transform transition-[transform] ease-[cubic-bezier(0.645,0.045,0.355,1)]',
                  B <= 0
                    ? 'transform-[translateY(calc(5dvh+21%+25px))_scale(1)] md:transform-[translateY(18.5%)_scale(0.8)] duration-500'
                    : B === 1
                      ? 'transform-[translateY(calc(-35%+25px))] md:transform-[translateY(-24%)] duration-500'
                      : 'transform-[translateY(calc(5dvh+29%+25px))_scale(1.2)] md:transform-[translateY(22.5%)_scale(0.88)] duration-500 md:duration-600',
                )}
              >
                <video
                  ref={videoRef}
                  onPlaying={() => setPhoneReady(true)}
                  onError={() => setPhoneReady(false)}
                  poster="/assets/phone-demo-poster.webp"
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  x-webkit-airplay="deny"
                  disableRemotePlayback
                  disablePictureInPicture
                >
                  <source src="/assets/phone-demo.mov" type='video/mp4; codecs="hvc1"' />
                  <source src="/assets/phone-demo.webm" type="video/webm" />
                </video>
              </div>
            </div>
            <div
              className="absolute z-1"
              style={{
                top: isRecord ? 0 : 'var(--card-clip-t, 25%)',
                right: isRecord ? 0 : 'var(--card-clip-r, 16px)',
                bottom: isRecord ? 0 : 'var(--card-clip-b, 20%)',
                left: isRecord ? 0 : 'var(--card-clip-l, 16px)',
                transition: `top 500ms ${ease}, right 500ms ${ease}, bottom 500ms ${ease}, left 500ms ${ease}`,
              }}
            >
              {captions.map((c) => (
                <Caption key={c.index} activeIndex={B} {...c} />
              ))}
            </div>
          </div>

          <div
            role={expanded ? undefined : 'button'}
            tabIndex={btnVisible && !expanded ? 0 : -1}
            aria-label={expanded ? undefined : 'Expand section'}
            onKeyDown={(e) => {
              if (expanded) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.currentTarget.click()
              }
            }}
            onClick={() => {
              if (expanded) return
              haptics.light()
              track('be_here_now_clicked')
              const sec = sectionRef.current
              if (!sec) return
              const rect = sec.getBoundingClientRect()
              const top = (5 / 6) * (rect.height - window.innerHeight) - -rect.top
              ;(sec.closest('[data-scroll-root]') ?? window).scrollBy({ top, behavior: 'smooth' })
            }}
            className={cn(
              'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-[#008cff] transition-all overflow-hidden',
              btnVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
              expanded ? 'shadow-none rounded-none translate-y-[calc(-50%-40px)] md:translate-y-[calc(-50%-27px)]' : 'rounded-[40px] shadow-[0px_4px_14px_0px_#FFFFFF60_inset,0px_0px_24px_0px_#008CFF90] cursor-pointer',
              btnVisible ? (!expanded && !goingForwardPast(prevForBtn.current) ? 'duration-500 delay-500' : 'duration-500') : 'duration-150',
            )}
            style={{
              backgroundColor: 'oklch(0.6474 0.2088 252.22)',
              left: expanded ? '50%' : 'var(--btn-center-x, 50%)',
              top: expanded ? '50%' : 'var(--btn-center-y, 50%)',
              width: expanded ? 'calc(100% + 36px)' : 'var(--btn-width, 180px)',
              height: expanded ? (isMobile ? 'calc(100% + 112px)' : 'calc(100% + 90px)') : 'var(--btn-height, 60px)',
            }}
          >
            <p
              className={cn(
                'font-inter transition-all duration-500 absolute left-1/2 top-1/2 -translate-x-[46%] -translate-y-[49%] text-white font-medium tracking-[-4.5%]',
                expanded ? 'scale-300 opacity-0' : 'scale-100 opacity-100',
              )}
              style={{ fontSize: 'calc(var(--btn-height, 60px) * 0.271)' }}
            >
              Be here now
            </p>
            <div ref={waveHost} className={cn('absolute inset-0 transition-opacity duration-500', expanded ? 'opacity-100' : 'opacity-0')}>
              {waveLoaded && <WaveVideo isMobile={isMobile} />}
            </div>
          </div>

          <div
            className="pointer-events-none absolute -inset-x-4 -bottom-4 z-20"
            style={{
              top: 'calc(-1 * var(--sf-pad-top, 96px))',
              clipPath: expanded
                ? 'inset(0 round 0px)'
                : btnVisible
                  ? 'inset(calc(var(--expand-btn-inset-top) + var(--sf-pad-top, 96px)) calc(var(--expand-btn-inset-right) + 1rem) calc(var(--expand-btn-inset-bottom) + 1rem) calc(var(--expand-btn-inset-left) + 1rem) round var(--expand-btn-radius))'
                  : 'inset(50% round 40px)',
              transition: `clip-path ${btnVisible ? 500 : 150}ms ease`,
            }}
          >
            <div className="absolute inset-x-4 bottom-4" style={{ top: 'var(--sf-pad-top, 96px)' }}>
              <p
                className={cn(
                  'text-white type-title absolute left-1/2 w-[500px] max-w-[90vw] -translate-x-1/2 px-2 text-center transition-all duration-400 md:px-0',
                  searchHeadlineOn ? 'opacity-100 scale-100 delay-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-8',
                  'top-[calc(30%-160px)] md:top-[max(36px,calc(var(--search-anchor)-var(--headline-offset)))]',
                )}
              >
                <span className="absolute -inset-x-3 -inset-y-6 bg-black opacity-40 blur-2xl rounded-2xl md:-inset-3 md:blur-2xl md:opacity-50" style={{ transform: 'translate3d(0,0,0)' }} />
                <span className="relative">{search.headline}</span>
              </p>
              <p
                className={cn(
                  'text-white type-title absolute left-1/2 w-[649px] max-w-[90vw] -translate-x-1/2 px-2 text-center transition-all duration-400 md:px-0',
                  notifOn ? 'opacity-100 scale-100 delay-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8',
                  'top-[calc(30%-160px)] md:top-[max(36px,calc(var(--search-anchor)-var(--headline-offset)))]',
                )}
              >
                <span className="absolute -inset-x-3 -inset-y-6 bg-black opacity-40 blur-2xl rounded-2xl md:-inset-3 md:blur-2xl md:opacity-50" style={{ transform: 'translate3d(0,0,0)' }} />
                <span className="relative">{notif.headline}</span>
              </p>
            </div>
          </div>

          <div
            className={cn(
              'absolute left-1/2 z-30 flex max-w-[90vw] -translate-x-1/2 items-center justify-center gap-2 md:gap-3 rounded-full bg-white/80 backdrop-blur-md transition-all',
              searchHeadlineOn ? 'pointer-events-auto' : 'pointer-events-none',
              searchHeadlineOn && goingForward ? 'opacity-100 delay-100 duration-500' : searchHeadlineOn ? 'opacity-100 duration-500' : 'opacity-0 duration-200',
              queryDone ? 'top-[30%] h-14 w-[480px] px-0 md:top-(--search-anchor) md:h-[72px] md:px-6' : 'top-[40%] h-[72px] w-[480px] px-0 md:h-[120px] md:w-[640px] md:px-14',
            )}
            style={{ boxShadow: GLASS }}
          >
            <span className={cn('shrink-0 overflow-hidden text-black opacity-50 transition-all duration-500', queryDone ? 'size-4 md:size-6' : 'size-4 md:size-9')}>
              <SearchIcon />
            </span>
            <span
              className={cn(
                'truncate text-black transition-all duration-500 font-inter',
                queryDone ? 'text-[14px] md:text-[20px] tracking-[-0.035em]' : 'text-[16px] md:text-[32px] tracking-[-0.025em]',
                typed === 0 && 'opacity-40',
              )}
            >
              {typed === 0 ? 'Search' : typedQuery}
            </span>
          </div>

          <div
            className={cn(
              'pointer-events-none absolute left-1/2 z-30 flex w-[480px] max-w-[90vw] -translate-x-1/2 flex-col gap-3 transition-all md:gap-4',
              'top-[calc(30%+68px)] md:top-[calc(var(--search-anchor)+96px)]',
              queryDone && !notifOn ? 'translate-y-0 opacity-100 duration-300 delay-200' : 'translate-y-4 opacity-0 duration-200 delay-0',
            )}
          >
            <div className={cn('rounded-2xl bg-white/80 backdrop-blur-md p-4 md:p-6', searchHeadlineOn ? 'pointer-events-auto' : 'pointer-events-none')} style={{ boxShadow: GLASS }}>
              <p className="type-body font-inter text-black tracking-[-0.03em]">{search.answerText}</p>
            </div>
            <div className={cn('rounded-2xl bg-white/80 backdrop-blur-md p-4 md:p-6', searchHeadlineOn ? 'pointer-events-auto' : 'pointer-events-none')} style={{ boxShadow: GLASS }}>
              <p className="type-body-sm font-inter mb-3 font-medium text-[#737373] md:mb-5">Sources</p>
              <ul className="flex flex-col gap-3 md:gap-5">
                {search.sources.map((s) => (
                  <li key={s.initial} className="flex items-start gap-3 md:gap-5">
                    <div
                      className="flex size-[34px] shrink-0 items-center font-medium font-inter justify-center rounded-full text-[16px] tracking-[-0.47px] text-white/90 md:size-[43px] md:text-[20px]"
                      style={{ backgroundColor: s.bgColor }}
                    >
                      {s.initial}
                    </div>
                    <div className="type-body-sm font-inter flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="font-medium text-black">{s.name}</p>
                      <p className="text-[#222] font-medium">{s.subject}</p>
                      <p className="truncate text-[#737373]">{s.preview}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="absolute left-1/2 z-30 w-full max-w-[600px] -translate-x-1/2 top-[42%] md:top-[max(calc(44%+2rem),20rem)]" style={{ marginTop: -emailH }}>
            <div className="relative">
              <div
                aria-hidden={!notifA}
                className={cn(
                  'pointer-events-none mx-2.5 overflow-hidden rounded-[24px] bg-white/55 font-inter shadow-[0_12px_32px_-18px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all md:mx-3 md:rounded-[28px]',
                  notifA ? 'translate-y-0 opacity-100 duration-500' : 'translate-y-3 opacity-0 duration-300 delay-75',
                )}
                style={{ maskImage: 'linear-gradient(to bottom, #000 0%, #000 calc(100% - 6.5rem), transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 calc(100% - 6.5rem), transparent 100%)' }}
              >
                <div ref={emailCardRef} className="flex flex-col gap-2.5 px-4 pt-3.5 pb-3 md:gap-3 md:px-6 md:pt-5 md:pb-3.5">
                  <p className="text-[16px] font-medium leading-[1.2] tracking-[-0.03em] text-black md:text-[20px]">{notif.emailSubject}</p>
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <img src="/assets/avatars/pacific-airlines.png" alt="" width="40" height="40" className="size-7 shrink-0 rounded-full object-cover md:size-9" />
                    <div className="flex min-w-0 flex-1 items-baseline gap-3">
                      <p className="type-body min-w-0 flex-1 truncate font-medium tracking-[-0.02em] text-black">{notif.notificationSender}</p>
                      <p className="type-body-sm shrink-0 text-[#6e6d6a]">{notif.notificationTime}</p>
                    </div>
                  </div>
                </div>
                <p className="type-body max-h-[22rem] overflow-hidden px-4 pb-16 leading-[1.35] tracking-[-0.01em] whitespace-pre-line text-[#6e6d6a] md:max-h-[24rem] md:px-6">{notif.emailBody}</p>
              </div>
              <div className={cn('absolute inset-x-0 z-10 flex transition-all', notifB ? 'translate-y-0 opacity-100 duration-500' : 'translate-y-6 opacity-0 duration-300')} style={{ top: emailH }}>
                <div className="flex w-full items-center rounded-[20px] bg-white/80 backdrop-blur-md gap-4 sm:gap-5 py-0 sm:py-2 px-4 sm:px-6" style={{ boxShadow: GLASS }}>
                  <img src="/assets/square-logo-195.png" alt="Avec" className="aspect-square h-1/2 sm:h-2/3 w-auto shrink-0 rounded-[25%]" />
                  <div className="flex min-w-0 flex-1 flex-col font-inter">
                    <p className="type-body font-medium tracking-[-0.02em] text-black">{notif.notificationSender}</p>
                    <p className="type-body leading-[1.35] tracking-[-0.01em]">{notif.notificationBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {['compose_record', 'compose_drafted', 'low_importance', 'deck_empty', 'search', 'notifications'].map((name) => (
        <div key={name} className="h-dvh snap-start" aria-hidden="true" data-section-group="expand" data-section-name={name} />
      ))}
    </section>
  )
}

// First reveal of the "Be here now" button (B just reached 4) uses a 500ms delay.
function goingForwardPast(prev) {
  return prev >= 4
}
