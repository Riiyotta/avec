import { useCallback, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { content, fakeEmails } from '../content'
import { useScrollApproach, useScrollFloat } from '../hooks/useScroll'
import EmailStack from './EmailStack'
import TriageGame from './TriageGame'
import WordReveal from './WordReveal'

export function scrollRevealGraphicBackground(f) {
  const mix = (a, b, frac) => {
    const r = Math.max(0, Math.min(1, (frac - 0.25) / 0.5))
    return r <= 0 ? `var(--color-${a})` : r >= 1 ? `var(--color-${b})` : `color-mix(in srgb, var(--color-${a}) ${(1 - r) * 100}%, var(--color-${b}) ${100 * r}%)`
  }
  return f < 0 ? 'var(--color-surface)' : f < 1 ? mix('surface', 'accent-green', f) : f < 2 ? mix('accent-green', 'accent-sky', f - 1) : f < 3 ? mix('accent-sky', 'surface', f - 2) : 'var(--color-surface)'
}

// Ported from ScrollRevealSection (module 97027).
export default function Deck() {
  const copy = content.scrollReveal
  const ref = useRef(null)
  const float = useScrollFloat(ref, 3, { snap: true })
  const approach = useScrollApproach(ref)
  const level = float < 0 ? -1 : Math.min(3, Math.floor(float))
  const [pulse, setPulse] = useState(null)

  const onSwipe = useCallback((dir) => {
    setPulse((p) => ({ key: (p?.key ?? 0) + 1, color: dir === 'right' ? 'var(--color-accent-green)' : 'var(--color-accent-sky)' }))
  }, [])
  const onPulse = useCallback((color) => {
    setPulse((p) => ({ key: (p?.key ?? 0) + 1, color }))
  }, [])

  const chunk = (i) => (float < 0 ? 0 : i >= 3 ? +(float >= 3) : Math.max(0, Math.min(1, float - i)))
  const bg = scrollRevealGraphicBackground(float)
  const inProgress = (v) => v > 0 && v < 1
  const dim0 = inProgress(approach) ? 0.3 : undefined
  const dim1 = inProgress(chunk(0)) ? 0.3 : undefined
  const dim2 = inProgress(chunk(1)) ? 0.3 : undefined
  const dim3 = inProgress(chunk(2)) ? 0.3 : undefined
  const game = float >= 3

  return (
    <section ref={ref} className="snap-start" data-section-group="scroll_reveal" data-section-name="deck_intro">
      <div className="sticky top-0 flex h-dvh flex-col bg-background px-4 pt-24 pb-4 md:pt-[70px]">
        <div className="section-content relative flex flex-1 flex-col-reverse items-stretch md:flex-row">
          <div className="flex shrink-0 flex-col justify-center py-4 md:flex-1 md:py-0 md:pr-8 snug:pl-4 type-body-lg max-md:[@media(max-height:700px)]:type-body max-md:[@media(max-height:700px)]:tracking-tighter">
            <p className="max-w-[480px]">
              <WordReveal text={copy.intro} revealLevel={level} requiredLevel={0} progress={approach} dimmedOpacity={dim0} />{' '}
              <WordReveal text={copy.swipeDone} revealLevel={level} requiredLevel={1} progress={chunk(0)} dimmedOpacity={dim1} />{' '}
              <WordReveal text={copy.swipeLater} revealLevel={level} requiredLevel={2} progress={chunk(1)} dimmedOpacity={dim2} />
            </p>
            <p className="max-w-[480px] mt-4 md:mt-6">
              <WordReveal text={copy.end} revealLevel={level} requiredLevel={3} progress={chunk(2)} dimmedOpacity={dim3} />
            </p>
          </div>
          <div className="flex w-full min-h-0 flex-1 flex-col justify-center select-none">
            <div className="hidden md:block md:min-h-[36px] md:flex-1" />
            <div className="relative w-full flex-1 md:grow-[999] overflow-hidden rounded-4xl max-h-[640px]" style={{ backgroundColor: bg, transition: 'none' }}>
              {pulse && <div key={pulse.key} className="animate-bg-pulse pointer-events-none absolute inset-0 rounded-[29px]" style={{ backgroundColor: pulse.color }} />}
              <div className="absolute inset-0" style={{ opacity: +!game, transition: 'none', pointerEvents: game ? 'none' : 'auto' }}>
                <EmailStack emails={fakeEmails} activeIndex={Math.min(level, 2)} scrollFloat={float < 0 ? undefined : float} onSwipe={onSwipe} />
              </div>
              <div className={cn('absolute inset-0 bg-transparent', game ? 'pointer-events-auto' : 'pointer-events-none')} style={{ opacity: +!!game, transition: 'none' }}>
                <TriageGame emails={fakeEmails} onPulse={onPulse} active={game} />
              </div>
            </div>
            <div className="hidden md:block md:flex-1" />
          </div>
        </div>
      </div>
      <div className="h-dvh snap-start" aria-hidden="true" data-section-group="scroll_reveal" data-section-name="deck_swipe_done" />
      <div className="h-dvh snap-start" aria-hidden="true" data-section-group="scroll_reveal" data-section-name="deck_swipe_later" />
      <div className="h-dvh snap-start" aria-hidden="true" data-section-group="scroll_reveal" data-section-name="triage_game" />
    </section>
  )
}
