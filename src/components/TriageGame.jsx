import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import EmailStack from './EmailStack'
import { ArrowIcon } from './Icons'
import { useIosHaptics } from '../hooks/useIosHaptics'
import { getScoreStats, recordScore, track } from '../lib/analytics'

// Ported from module 10989 (TriageGame / "Avec Stack Challenge") in 2632ue434kip8.js.
const EMPTY_HISTOGRAM = [{ bucket: 0, count: 0 }]
const preventTouch = (e) => e.preventDefault()
const randomLabels = (n) => Array.from({ length: n }, () => (0.5 > Math.random() ? 'later' : 'done'))

function ScoreHistogram({ histogram, playerScore, loading, height = 64, barColor = 'bg-foreground/20', activeColor = 'bg-foreground' }) {
  const [hover, setHover] = useState(null)
  const hoverRef = useRef(null)
  const barsRef = useRef(null)
  const setBars = useCallback((el) => {
    if (barsRef.current) barsRef.current.removeEventListener('touchmove', preventTouch)
    barsRef.current = el
    if (el) el.addEventListener('touchmove', preventTouch, { passive: false })
  }, [])
  const first = histogram[0]
  const last = histogram[histogram.length - 1]
  const min = first?.bucket ?? 0
  const max = last?.bucket ?? 0
  const span = max - min + 1
  const bucketAt = useCallback(
    (clientX) => {
      const el = barsRef.current
      if (!el || span <= 0) return null
      const rect = el.getBoundingClientRect()
      const x = clientX - rect.left - 8
      const w = rect.width - 16
      return x < 0 || x >= w ? null : min + Math.min(Math.floor((x / w) * span), span - 1)
    },
    [min, span],
  )
  const setHoverBucket = useCallback((b) => {
    if (b !== hoverRef.current) {
      hoverRef.current = b
      setHover(b)
    }
  }, [])
  const { allBuckets, maxCount } = useMemo(() => {
    if (!first || !last) return { allBuckets: [], maxCount: 0 }
    const map = new Map(histogram.map((h) => [h.bucket, h.count]))
    const arr = []
    for (let b = min; b <= max; b++) arr.push({ bucket: b, count: map.get(b) ?? 0 })
    return { allBuckets: arr, maxCount: Math.max(...arr.map((x) => x.count)) }
  }, [histogram, first, last, min, max])

  if (loading) {
    return (
      <div className="mt-4">
        <div className="flex items-center justify-center gap-px px-2" style={{ height }}>
          <p className="text-[16px]/[24px] text-foreground/30 font-medium animate-pulse">Loading...</p>
        </div>
        <div className="h-px bg-foreground/15 mt-px rounded" />
        <div className="mt-0.5 flex justify-between text-[12px]/[16px] tabular-nums text-foreground/30">
          <div className="h-4 w-4" />
        </div>
      </div>
    )
  }
  if (!first || !last) return null
  return (
    <div className="mt-4">
      <div
        ref={setBars}
        className="relative flex items-end justify-center gap-px px-2"
        style={{ height }}
        onMouseLeave={() => setHoverBucket(null)}
        onTouchStart={(e) => {
          const t = e.touches[0]
          t && setHoverBucket(bucketAt(t.clientX))
        }}
        onTouchMove={(e) => {
          const t = e.touches[0]
          t && setHoverBucket(bucketAt(t.clientX))
        }}
        onTouchEnd={() => setHoverBucket(null)}
        onTouchCancel={() => setHoverBucket(null)}
      >
        {allBuckets.map((b, i) => {
          const pct = maxCount > 0 ? (b.count / maxCount) * 100 : 0
          const isPlayer = b.bucket === playerScore
          const isHover = b.bucket === hover
          return (
            <div key={b.bucket} className="relative flex-1" style={{ height: '100%' }} onMouseEnter={() => setHoverBucket(b.bucket)}>
              {isHover && <Tooltip bucket={b.bucket} count={b.count} index={i} total={allBuckets.length} />}
              <div className={`absolute inset-x-0 bottom-0 rounded-t-[1px] transition-colors duration-75 ${isHover ? activeColor : isPlayer ? 'bg-accent-sky' : barColor}`} style={{ height: `${Math.max(pct, 4 * (b.count > 0))}%`, minHeight: 2 * (b.count > 0) }} />
            </div>
          )
        })}
      </div>
      <div className="h-px bg-foreground/15 mt-px rounded" />
      <div className="mt-0.5 flex justify-between text-[12px]/[16px] tabular-nums text-foreground/30">
        <span className="w-5">{min}</span>
        <span className="w-5">{max}</span>
      </div>
    </div>
  )
}

function Tooltip({ bucket, count, index, total }) {
  return (
    <div className={`absolute bottom-full z-10 pointer-events-none mb-1.5 ${index <= 1 ? 'left-0' : index >= total - 2 ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}>
      <div className="bg-white rounded-md px-2 py-1 text-[12px]/[16px] font-medium tabular-nums text-black whitespace-nowrap shadow-lg">
        {bucket} pts <span className="text-neutral-500">({count})</span>
      </div>
    </div>
  )
}

const DEMO = ['done', 'later', 'done', 'later', 'done', 'later']

function MiniCard({ label }) {
  const done = label === 'done'
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#f7f6f4] border border-foreground/10 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="flex flex-1 flex-col gap-1.5 px-3 pt-3 pb-1">
        <div className="h-1 w-[95%] rounded-full bg-foreground/10" />
        <div className="h-1 w-[85%] rounded-full bg-foreground/10" />
        <div className="h-1 w-[95%] rounded-full bg-foreground/10" />
        <div className="h-1 w-[60%] rounded-full bg-foreground/10" />
      </div>
      <div className={cn('mx-2 mb-2 flex items-center justify-center rounded-lg py-2', done ? 'bg-accent-green' : 'bg-accent-sky')}>
        <span className="text-[14px]/[14px] font-[550] tracking-tight text-white">{done ? 'Done' : 'Later'}</span>
      </div>
    </div>
  )
}

function IntroIllustration() {
  const [i, setI] = useState(0)
  const [swiping, setSwiping] = useState(false)
  useEffect(() => {
    const iv = setInterval(() => {
      setSwiping(true)
      setTimeout(() => {
        setI((n) => n + 1)
        setSwiping(false)
      }, 500)
    }, 1800)
    return () => clearInterval(iv)
  }, [])
  const dir = (DEMO[i % DEMO.length] ?? 'done') === 'done' ? 'right' : 'left'
  return (
    <div className="flex items-center gap-5 mt-1">
      <div className={cn('text-foreground transition-all duration-200 z-10', swiping && dir === 'left' ? 'text-accent-sky scale-125' : 'text-foreground/20 scale-100')}>
        <ArrowIcon direction="left" />
      </div>
      <div className="relative h-[120px] w-[90px]">
        {Array.from({ length: 2 }, (_, k) => {
          const idx = i + (1 - k)
          const off = idx - i
          const label = DEMO[idx % DEMO.length] ?? 'done'
          const leaving = off === 0 && swiping
          return (
            <div
              key={idx}
              className="absolute inset-0 origin-top"
              style={{
                zIndex: -off,
                transform: `translateY(${-4 * off}px) scale(${1 - 0.06 * off}) ${leaving ? (dir === 'right' ? 'translateX(120%) rotate(6deg)' : 'translateX(-120%) rotate(-6deg)') : ''}`,
                transition: `transform ${leaving ? '500ms' : '400ms'}, opacity ${leaving ? '150ms' : '400ms'} ${leaving ? '350ms' : '0ms'}`,
                transitionTimingFunction: leaving ? 'cubic-bezier(0.1, 0.3, 1, 0)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: off >= 2 || leaving ? 0 : 1,
              }}
            >
              <MiniCard label={label} />
            </div>
          )
        })}
      </div>
      <div className={cn('transition-all duration-200 z-10', swiping && dir === 'right' ? 'text-accent-green scale-125' : 'text-foreground/20 scale-100')}>
        <ArrowIcon direction="right" />
      </div>
    </div>
  )
}

function percentileText(p) {
  const rest = 100 - p
  const [top, bottom] = ['Top', 'Bottom']
  return p >= 50 ? (rest <= 0.01 ? `${top} 0.01% of players` : rest <= 0.05 ? `${top} 0.05% of players` : rest <= 0.1 ? `${top} 0.1% of players` : rest <= 0.5 ? `${top} 0.5% of players` : `${top} ${Math.round(rest)}% of players`) : `${bottom} ${Math.round(p)}% of players`
}

export default function TriageGame({ emails, onPulse, onScoreRecorded, onReset, active, standalone }) {
  const [state, setState] = useState('instructions')
  const [count, setCount] = useState(3)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(20)
  const [swipes, setSwipes] = useState([])
  const [labels, setLabels] = useState(() => randomLabels(emails.length))
  const [correct, setCorrect] = useState(0)
  const [stats, setStats] = useState(null)
  const [hash, setHash] = useState(null)
  const [hitLimit, setHitLimit] = useState(false)
  const [copied, setCopied] = useState(false)
  const [floaters, setFloaters] = useState([])
  const haptics = useIosHaptics()
  const stateRef = useRef(state)
  stateRef.current = state
  const scoreRef = useRef(score)
  scoreRef.current = score
  const touchX = useRef(null)
  const touchY = useRef(null)
  const swiped = useRef(false)
  const dragged = useRef(false)
  const topCard = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [dragExit, setDragExit] = useState(false)
  const overlayRef = useRef(null)
  const copiedTimer = useRef(null)

  const setOverlay = useCallback((el) => {
    if (overlayRef.current) overlayRef.current.removeEventListener('touchmove', preventTouch)
    overlayRef.current = el
    if (el) el.addEventListener('touchmove', preventTouch, { passive: false })
  }, [])

  const goto = useCallback((s) => {
    stateRef.current = s
    setState(s)
  }, [])
  const currentIndex = useCallback(() => 2 + swipes.length, [swipes.length])
  const currentLabel = useCallback(() => labels[currentIndex() % labels.length], [currentIndex, labels])
  const ensureLabels = useCallback(
    (n) => {
      if (2 + n >= labels.length) setLabels((l) => [...l, ...randomLabels(emails.length)])
    },
    [labels.length, emails.length],
  )

  const swipe = useCallback(
    (dir) => {
      if (stateRef.current !== 'playing') return
      const ok = dir === (currentLabel() === 'later' ? 'left' : 'right')
      if (ok) {
        setCorrect((c) => c + 1)
        haptics.light()
      } else haptics.error()
      const next = Math.max(-99, Math.min(scoreRef.current + (ok ? 1 : -1), 99))
      scoreRef.current = next
      setScore(next)
      if (next >= 99 || next <= -99) {
        setHitLimit(true)
        goto('finished')
      }
      if (ok) onPulse(dir === 'right' ? 'var(--color-accent-green)' : 'var(--color-accent-sky)')
      else onPulse('var(--color-accent-red)')
      ensureLabels(swipes.length + 1)
      setSwipes((s) => [...s, dir])
    },
    [currentLabel, onPulse, swipes.length, ensureLabels, goto, haptics],
  )

  const begin = useCallback(() => {
    haptics.light()
    track('game_started')
    goto('countdown')
    setCount(3)
  }, [goto, haptics])

  const resetTop = useCallback(() => {
    if (topCard.current) topCard.current.style.transform = ''
  }, [])
  const endDrag = useCallback(() => {
    setDragging(false)
    dragged.current = false
    touchX.current = null
    touchY.current = null
    swiped.current = false
    resetTop()
  }, [resetTop])

  const reset = useCallback(
    (to = 'instructions') => {
      goto(to)
      setScore(0)
      setCorrect(0)
      setTime(20)
      setCount(3)
      setSwipes([])
      setLabels(randomLabels(emails.length))
      setStats(null)
      setHash(null)
      setHitLimit(false)
      setCopied(false)
      setFloaters([])
      setDragExit(false)
      endDrag()
      onReset?.()
      if (copiedTimer.current) {
        clearTimeout(copiedTimer.current)
        copiedTimer.current = null
      }
    },
    [emails.length, goto, endDrag, onReset],
  )

  const share = useCallback(() => {
    haptics.light()
    track('game_share_clicked', { score })
    if (copiedTimer.current) {
      clearTimeout(copiedTimer.current)
      copiedTimer.current = null
    }
    const url = new URL(hash ? `/stackchallenge/s/${hash}` : '/stackchallenge', window.location.origin)
    const text = `Can you beat my score on @Avec Stack Challenge?\n${url.toString()}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      const id = Date.now()
      const dx = (Math.random() - 0.5) * 60
      const rotate = Math.sign(dx) * (2 + 4 * Math.random())
      setFloaters((f) => [...f, { id, text: 'Can you beat my score on @Avec Stack Challenge?', dx, rotate }])
      setTimeout(() => setFloaters((f) => f.filter((x) => x.id !== id)), 1000)
      copiedTimer.current = setTimeout(() => {
        setCopied(false)
        copiedTimer.current = null
      }, 2000)
    }).catch(() => {})
  }, [score, hash, haptics])

  const wasActive = useRef(active)
  useEffect(() => {
    if (wasActive.current && !active && stateRef.current !== 'finished') {
      const t = setTimeout(reset, 300)
      wasActive.current = active
      return () => clearTimeout(t)
    }
    wasActive.current = active
  }, [active, reset])

  useEffect(() => {
    if (state !== 'finished') return
    let cancelled = false
    ;(async () => {
      const rec = await recordScore(score)
      if (cancelled) return
      if (rec.ok && rec.hash) {
        setHash(rec.hash)
        onScoreRecorded?.(rec.hash)
      }
      const s = await getScoreStats(score)
      if (cancelled) return
      setStats(s)
      track('game_finished', { score, percentile: s.percentile, hitScoreLimit: hitLimit })
    })()
    return () => {
      cancelled = true
    }
  }, [state, score, hitLimit, onScoreRecorded])

  useEffect(() => {
    if (state !== 'countdown' || !active) return
    if (count <= 0) {
      goto('playing')
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [state, count, active, goto])

  useEffect(() => {
    if (state !== 'playing' || time <= 0 || !active) return
    const t = setTimeout(() => {
      setTime((s) => {
        const n = s - 1
        if (n <= 0) {
          goto('finished')
          return 0
        }
        return n
      })
    }, 1000)
    return () => clearTimeout(t)
  }, [state, time, active, goto])

  useEffect(() => {
    if (state !== 'playing') endDrag()
  }, [state, endDrag])

  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Enter' && stateRef.current === 'instructions') {
        e.preventDefault()
        begin()
        return
      }
      if (stateRef.current === 'playing' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault()
        setDragExit(false)
        swipe(e.key === 'ArrowRight' ? 'right' : 'left')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, begin, swipe])

  let note = null
  const loadingNote = !hitLimit && !stats
  if (hitLimit) note = score >= 99 ? "You hit the max score! You're almost too good..." : "You hit the min score! You're almost too bad..."
  else if (stats?.isNewRecord) note = 'New world record!'
  else if (stats?.isTiedRecord) note = 'You tied the world record!'
  else if (stats?.isNewWorstScore) note = "New world's worst score!"
  else if (stats?.isTiedWorstScore) note = "You tied the world's worst score!"
  else if (stats) note = percentileText(stats.percentile)

  return (
    <>
      <EmailStack emails={emails} activeIndex={3} gameSwipes={swipes} cardLabels={state === 'playing' ? labels : undefined} isDragging={dragging} dragExit={dragExit} topCardRef={topCard} />
      {state === 'playing' && (
        <div
          ref={setOverlay}
          className="absolute inset-0 z-30 flex pointer-fine:hidden touch-none"
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null
            touchY.current = e.touches[0]?.clientY ?? null
            swiped.current = false
            dragged.current = false
            setDragging(false)
          }}
          onTouchMove={(e) => {
            const x0 = touchX.current
            const y0 = touchY.current
            const t = e.touches[0]
            if (x0 == null || y0 == null || !t) return
            const dx = t.clientX - x0
            const dy = t.clientY - y0
            if (!dragged.current && Math.sqrt(dx * dx + dy * dy) > 5) {
              dragged.current = true
              setDragging(true)
            }
            if (dragged.current && topCard.current) {
              const rot = Math.max(-4, Math.min(4, 0.02 * dx))
              topCard.current.style.transform = `translateY(0px) scale(1) translateX(${dx}px) translateY(${dy}px) rotate(${rot}deg)`
            }
          }}
          onTouchCancel={endDrag}
          onTouchEnd={(e) => {
            const x0 = touchX.current
            const x1 = e.changedTouches[0]?.clientX
            const wasDragged = dragged.current
            touchX.current = null
            touchY.current = null
            dragged.current = false
            setDragging(false)
            if (wasDragged) {
              if (x0 != null && x1 != null) {
                const dx = x1 - x0
                if (Math.abs(dx) > 30) {
                  swiped.current = true
                  setDragExit(true)
                  swipe(dx > 0 ? 'right' : 'left')
                  return
                }
              }
              resetTop()
            }
          }}
        >
          <button type="button" className="h-full flex-1" onClick={() => { if (!swiped.current) { setDragExit(false); swipe('left') } }} aria-label="Later" />
          <button type="button" className="h-full flex-1" onClick={() => { if (!swiped.current) { setDragExit(false); swipe('right') } }} aria-label="Done" />
        </div>
      )}
      {state === 'instructions' && (
        <div
          className={cn('group absolute inset-0 z-20 flex items-center justify-center p-6 cursor-pointer transition-[backdrop-filter,background-color] duration-800', active ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-0')}
          onClick={begin}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') begin()
          }}
        >
          <div className={cn('flex flex-col items-center text-center text-balance gap-6 md:gap-8 [@media(max-height:700px)]:gap-3.5 rounded-[28px] bg-white px-4 py-6 md:p-8 ring-1 ring-black/10 shadow-xl pointer-fine:group-hover:scale-102 transition-transform duration-120 ease-out', active ? 'animate-card-enter' : 'opacity-0')}>
            <div className="flex flex-col items-center gap-1 md:gap-1">
              {!standalone && <p className="type-caption tracking-[-0.035em] font-medium text-foreground bg-surface/75 rounded-full px-2 py-1 mb-2 -mt-2.5 max-md:[@media(max-height:700px)]:hidden">Experience it yourself</p>}
              {standalone ? <h1 className="type-body-lg font-medium">Play Avec Stack Challenge</h1> : <h2 className="type-body-lg font-medium">Play Avec Stack Challenge</h2>}
              <p className="type-body md:text-[16px]/[24px] text-[14px]/[20px] w-full text-foreground font-medium">
                Sort as many emails as you can in {20}
                <span className="min-[381px]:hidden">s</span>
                <span className="hidden min-[381px]:inline"> sec</span>
                <span className="hidden min-[414px]:inline">onds</span>
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="type-body text-[14px]/[20px] tracking-[-0.02em] text-foreground font-medium">
                <span className="hidden pointer-fine:inline">Use the arrow keys to match each card's label</span>
                <span className="pointer-fine:hidden">Tap/swipe to match each card's label</span>
              </p>
              <IntroIllustration />
              <p className="type-body text-[14px]/[20px] tracking-[-0.02em] text-foreground font-medium text-balance pt-1 flex gap-1.5">
                <span className="bg-accent-green/30 rounded px-1.5 pb-1 pt-0.5 inline-flex gap-1.5">
                  <span className="text-green-700 font-semibold">+1</span> Correct
                </span>
                <span className="bg-accent-red/30 rounded px-1.5 pb-1 pt-0.5 inline-flex gap-1.5">
                  <span className="text-red-700 font-semibold">-1</span>Incorrect
                </span>
              </p>
            </div>
            <p className="type-body text-[16px]/[24px] font-medium pt-4 tracking-[-0.03em]">
              <span className="hidden pointer-fine:inline">
                Click or press <span className="border border-foreground/15 rounded px-1 pb-0.5">Enter</span> to begin
              </span>
              <span className="pointer-fine:hidden">Tap to begin</span>
            </p>
          </div>
        </div>
      )}
      {state === 'countdown' && count > 0 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <span key={count} className="type-display animate-countdown font-medium text-white">
            {count}
          </span>
        </div>
      )}
      {state === 'playing' && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-5">
            <div className="type-button rounded-full bg-black/40 px-3 py-1.5 font-medium tabular-nums text-white backdrop-blur-sm">{time}s</div>
            <div className="type-button rounded-full bg-black/40 px-3 py-1.5 font-medium tabular-nums text-white backdrop-blur-sm">
              {score} {score === 1 ? 'pt' : 'pts'}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-between px-6 type-button font-medium text-black/50">
            <span>{'← Later'}</span>
            <span>{'Done →'}</span>
          </div>
        </>
      )}
      {state === 'finished' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
          <div className="animate-card-enter flex w-full max-w-[360px] flex-col items-center [@media(min-height:700px)]:gap-1 rounded-[28px] bg-white p-4 md:p-8 text-center ring-1 ring-black/10 shadow-xl">
            <p className="text-[14px]/[20px] font-medium text-foreground/50">Your score</p>
            <p className="text-[32px]/[48px] [@media(min-height:700px)]:text-[48px]/[56px] font-semibold tabular-nums text-foreground">{score}</p>
            <p className="text-[16px]/[24px] font-medium tabular-nums text-foreground pb-3">{swipes.length > 0 ? `${Math.round((correct / swipes.length) * 100)}% accuracy` : '0% accuracy'}</p>
            {loadingNote ? (
              <div className="pb-2 flex justify-center">
                <div className="h-3 my-1 w-36 animate-pulse rounded-lg bg-foreground/10" />
              </div>
            ) : (
              <p className="text-[14px]/[20px] font-medium text-foreground/50 pb-2">{note ?? ' '}</p>
            )}
            <div className="flex w-full flex-col gap-1">
              <ScoreHistogram histogram={stats?.histogram ?? EMPTY_HISTOGRAM} playerScore={score} loading={!stats} />
            </div>
            <div className="mt-2 flex flex-col-reverse md:flex-row md:items-center gap-2 md:gap-3 w-full pt-4">
              <div className="relative flex-1">
                {floaters.map((f) => (
                  <span key={f.id} className="animate-float-up-fade origin-bottom border border-foreground/5 pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 whitespace-pre-line text-center text-[12px]/[16px] font-medium text-foreground/70 bg-white/70 backdrop-blur-sm min-w-[220px] text-balance rounded-lg p-2" style={{ '--float-dx': `${f.dx}px`, '--float-rot': `${f.rotate}deg` }}>
                    {f.text}
                  </span>
                ))}
                <button type="button" onClick={share} className={cn('w-full rounded-full tracking-tight px-6 py-3 text-[16px]/[24px] font-medium hover:opacity-90 cursor-pointer border border-transparent transition-transform duration-120 active:scale-[0.97]', copied ? 'bg-accent-green text-white' : 'bg-foreground text-white')}>
                  {copied ? 'Copied!' : 'Share'}
                </button>
              </div>
              <button type="button" onClick={() => { haptics.light(); track('game_play_again_clicked', { score }); reset('countdown') }} className="rounded-full border border-foreground/15 tracking-tight px-6 py-3 text-[16px]/[24px] font-medium text-foreground hover:bg-foreground/5 flex-1 cursor-pointer transition-transform duration-120 active:scale-[0.97]">
                Play again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
