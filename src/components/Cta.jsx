import { NotifyPlatformIcon } from './Icons'
import NotifyModalButton from './NotifyModal'
import { cn } from '../lib/cn'

const TESTFLIGHT_URL = 'https://testflight.apple.com/join/3JR2HxjZ'

const SIZES = {
  sm: { btn: 'gap-3 rounded-xl px-4 py-3', icon: 'size-5', label: 'type-button tracking-[-0.02em]' },
  lg: { btn: 'gap-4 rounded-2xl px-6 py-4', icon: 'size-6', label: 'type-body tracking-[-0.025em]' },
}

const BASE =
  'cursor-pointer items-center border transition-transform duration-120 active:scale-[0.97] border-black/50 hover:bg-surface-alt'

export function ctaClass(size, layout) {
  return cn(BASE, SIZES[size].btn, layout)
}

export function ctaLabelClass(size) {
  return cn('whitespace-nowrap font-medium select-none text-black', SIZES[size].label)
}

export function TestFlightButton({ size = 'lg', layout = 'flex w-fit' }) {
  return (
    <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer" aria-label="Get early access" className={ctaClass(size, layout)}>
      <img alt="" loading="lazy" width="48" height="48" decoding="async" className={cn('shrink-0 rounded-[6px]', SIZES[size].icon)} style={{ color: 'transparent' }} src="/assets/testflight.png" />
      <span className={ctaLabelClass(size)}>Get early access</span>
    </a>
  )
}

export function GetNotifiedButton({ size = 'lg', layout = 'flex w-fit', label = 'Get notified' }) {
  return (
    <NotifyModalButton
      label={label}
      className={ctaClass(size, layout)}
      labelClassName={ctaLabelClass(size)}
      icon={
        <div className={cn('shrink-0', SIZES[size].icon)}>
          <NotifyPlatformIcon />
        </div>
      }
    />
  )
}
