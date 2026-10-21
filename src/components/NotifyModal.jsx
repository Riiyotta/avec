import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/cn'
import { useOverlay } from '../hooks/useOverlay'
import { useIosHaptics } from '../hooks/useIosHaptics'
import { joinWaitlist, track } from '../lib/analytics'
import { NotifyPlatformIcon, SpinnerIcon } from './Icons'

// "Get notified" button + modal. Backend call replaced by a local stub (lib/analytics.js).
export default function NotifyModalButton({ className, labelClassName, icon, label }) {
  const haptics = useIosHaptics()
  const [open, setOpen] = useState(false)
  const overlay = useOverlay(open)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const inputRef = useRef(null)

  const onOpen = useCallback(() => {
    haptics.light()
    track('get_notified_clicked')
    setOpen(true)
  }, [haptics])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      haptics.light()
      setStatus('loading')
      joinWaitlist(email, 'more-platforms').then(
        (r) => setStatus(r.ok ? 'success' : 'error'),
        () => setStatus('error'),
      )
    },
    [email, haptics],
  )

  const close = useCallback(() => {
    if (status !== 'loading') setOpen(false)
  }, [status])

  useEffect(() => {
    if (!overlay.mounted && status !== 'idle') {
      setEmail('')
      setStatus('idle')
    }
  }, [overlay.mounted, status])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <>
      <button type="button" onClick={onOpen} className={className}>
        {icon}
        <span className={labelClassName}>{label}</span>
      </button>
      {overlay.mounted &&
        createPortal(
          <div
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center px-4 transition-[opacity,backdrop-filter,background-color] duration-200',
              overlay.visible ? 'bg-black/50 backdrop-blur-sm ease-out' : 'bg-black/0 backdrop-blur-0 ease-in',
            )}
            onTransitionEnd={overlay.onTransitionEnd}
            onClick={close}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="notify-dialog-title"
              className={cn(
                'flex w-full max-w-sm flex-col items-center gap-6 rounded-[28px] bg-background p-6 pt-8 md:p-8 ring-1 ring-black/10 transition-all duration-200',
                overlay.visible ? 'scale-100 opacity-100 blur-0 ease-out' : 'scale-75 opacity-0 blur-2xl ease-in',
              )}
              onClick={(e) => e.stopPropagation()}
              onTransitionEnd={(e) => {
                if (e.target === e.currentTarget && e.propertyName === 'opacity' && overlay.visible) inputRef.current?.focus()
              }}
            >
              <div className="flex flex-col items-center">
                <div className="size-12 shrink-0 mb-4">
                  <NotifyPlatformIcon />
                </div>
                <p id="notify-dialog-title" className="text-center text-lg font-medium tracking-tight">
                  Get notified
                </p>
                <p className="text-center text-sm tracking-tight">We’ll email you when Avec is available for more platforms</p>
              </div>
              <div className="grid w-full *:[grid-area:1/1]">
                <form onSubmit={onSubmit} className={`flex flex-col gap-2 transition-opacity duration-200 ${status === 'success' ? 'pointer-events-none' : ''}`}>
                  <input
                    type="email"
                    name="email"
                    required
                    ref={inputRef}
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    inputMode="email"
                    enterKeyHint="send"
                    aria-label="Email address"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className={cn(
                      'flex-1 rounded-xl transition-opacity duration-250 tracking-tight bg-white px-3 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] placeholder:text-soft focus-visible:shadow-[0_0_0_1px_rgba(0,0,0,0.12)] disabled:opacity-50 md:text-sm',
                      status === 'success' ? 'opacity-0' : '',
                    )}
                  />
                  <button type="submit" disabled={status === 'loading'} className="relative rounded-xl bg-brand px-4 py-3 font-medium text-white tracking-tight hover:bg-brand-alt disabled:hover:bg-brand">
                    <span className={status === 'loading' ? 'opacity-0' : 'opacity-100'}>{status === 'error' ? 'Try again' : 'Submit'}</span>
                    {status === 'loading' && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <SpinnerIcon className="text-white/50" />
                      </span>
                    )}
                  </button>
                </form>
                {status === 'success' && (
                  <div className="flex">
                    <p className="relative flex-1 animate-[expand_250ms_cubic-bezier(0.22,1,0.36,1)_forwards] mt-auto flex items-center justify-center py-2 font-medium rounded-xl text-white tracking-tight">You're on the list!</p>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
