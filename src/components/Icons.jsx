import { useId, useMemo } from 'react'
import logoRaw from '../assets/avec-logo.svg?raw'
import outlookRaw from '../assets/outlook-icon.svg?raw'
import androidRaw from '../assets/android-icon.svg?raw'
import appStoreRaw from '../assets/app-store-wordmark.svg?raw'
import { STAR_OUTLINE, STAR_FILL } from '../lib/starPaths'
import { REPLY, CHECK, LATER, REPLAY } from '../lib/iconPaths'

function RawSvg({ raw, className, idFrom }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const html = useMemo(() => {
    let out = raw
    if (idFrom) out = out.split(idFrom).join(`i${uid}`)
    if (className) out = out.replace('<svg ', `<svg class="${className}" `)
    return out
  }, [raw, className, idFrom, uid])
  // The SVG markup is a trusted local asset; render it inline so it can use currentColor.
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />
}

export const AvecWordmark = ({ className }) => <RawSvg raw={logoRaw} className={className} />
export const OutlookIcon = () => <RawSvg raw={outlookRaw} idFrom="_R_aun5flb_" />
export const AndroidIcon = () => <RawSvg raw={androidRaw} />
export const AppStoreWordmark = ({ className }) => <RawSvg raw={appStoreRaw} className={className} />

export function AvecLogo() {
  return (
    <svg viewBox="0 0 186.377 147.734" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M81.6911 42.6845C93.067 31.3086 118.019 37.1195 141.819 55.1734C149.597 35.3077 149.48 17.6938 139.58 7.79334C121.384 -10.4029 77.1356 4.35082 40.7432 40.7432C4.35082 77.1227 -10.4029 121.371 7.79334 139.567C25.9895 157.763 66.1221 144.304 101.44 111.6C77.8086 85.4184 68.8917 55.471 81.6782 42.6845H81.6911Z" fill="currentColor" />
      <path d="M155.809 67.3929C151.266 62.8503 146.569 58.7736 141.819 55.1758C135.296 71.819 123.222 90.0411 106.63 106.632C104.922 108.341 103.188 109.984 101.44 111.602C103.032 113.362 104.676 115.096 106.397 116.818C133.691 144.112 166.874 155.177 180.528 141.524C194.182 127.87 183.116 94.6872 155.822 67.3929H155.809Z" fill="currentColor" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg height="100%" width="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function NotifyPlatformIcon() {
  return (
    <div className="relative size-full">
      <div className="absolute top-0 left-0 size-[72%]">
        <OutlookIcon />
      </div>
      <div className="absolute right-0 bottom-0 size-[72%] drop-shadow-[0_0_1px_#fff,0_0_2px_#fff]">
        <AndroidIcon />
      </div>
    </div>
  )
}

export function Star({ score, size }) {
  const s = Math.max(0, Math.min(1, score))
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={id}>
          <rect x="3.32" y="0" width={17.35 * s} height="24" />
        </clipPath>
      </defs>
      <path d={STAR_OUTLINE} fill="currentColor" />
      <path d={STAR_FILL} fill="currentColor" clipPath={`url(#${id})`} />
    </svg>
  )
}

export function Stars({ score, size = 24 }) {
  const s = Math.max(0, Math.min(5, score))
  return (
    <div className="inline-flex *:-mr-0.75">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} score={s - i} size={size} />
      ))}
    </div>
  )
}

export function ReplyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={REPLY} fill="currentColor" />
    </svg>
  )
}

export function SwipeLabelIcon({ done }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d={done ? CHECK : LATER} />
    </svg>
  )
}

export const PauseIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="7" y="5.5" width="3.5" height="13" rx="1.25" fill="currentColor" />
    <rect x="13.5" y="5.5" width="3.5" height="13" rx="1.25" fill="currentColor" />
  </svg>
)

export const PlayIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9.5 5.75 18.5 12l-9 6.25V5.75Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

export const ReplayIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d={REPLAY} fill="white" />
  </svg>
)

export function ArrowIcon({ direction }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      {direction === 'left' ? (
        <path d="M0.392578 5.75781C0.392578 5.54688 0.470703 5.36719 0.626953 5.21875L4.45898 1.38672C4.54102 1.30469 4.625 1.24609 4.71094 1.21094C4.80078 1.17188 4.89062 1.15234 4.98047 1.15234C5.19531 1.15234 5.36914 1.21875 5.50195 1.35156C5.63477 1.48438 5.70117 1.64844 5.70117 1.84375C5.70117 1.94922 5.67969 2.04688 5.63672 2.13672C5.59766 2.22266 5.54492 2.29883 5.47852 2.36523L4.16602 3.68945L2.08594 5.59961L1.81641 5.14844L3.94922 5.03125H10.8633C11.0859 5.03125 11.2656 5.09961 11.4023 5.23633C11.5391 5.36914 11.6074 5.54297 11.6074 5.75781C11.6074 5.97656 11.5391 6.1543 11.4023 6.29102C11.2656 6.42383 11.0859 6.49023 10.8633 6.49023H3.94922L1.81641 6.36719L2.08594 5.92773L4.16602 7.82617L5.47852 9.15039C5.54492 9.2168 5.59766 9.29297 5.63672 9.37891C5.67969 9.46484 5.70117 9.5625 5.70117 9.67188C5.70117 9.86719 5.63477 10.0312 5.50195 10.1641C5.36914 10.2969 5.19531 10.3633 4.98047 10.3633C4.79297 10.3633 4.62305 10.2871 4.4707 10.1348L0.626953 6.29688C0.470703 6.14844 0.392578 5.96875 0.392578 5.75781Z" fill="currentColor" />
      ) : (
        <path d="M11.6074 5.75781C11.6074 5.96875 11.5312 6.14844 11.3789 6.29688L7.5293 10.1348C7.37695 10.2871 7.20703 10.3633 7.01953 10.3633C6.80469 10.3633 6.63086 10.2969 6.49805 10.1641C6.36523 10.0312 6.29883 9.86719 6.29883 9.67188C6.29883 9.5625 6.31836 9.46484 6.35742 9.37891C6.40039 9.29297 6.45508 9.2168 6.52148 9.15039L7.83398 7.82617L9.91406 5.92773L10.1836 6.36719L8.05078 6.49023H1.13672C0.914062 6.49023 0.734375 6.42383 0.597656 6.29102C0.460938 6.1543 0.392578 5.97656 0.392578 5.75781C0.392578 5.54297 0.460938 5.36914 0.597656 5.23633C0.734375 5.09961 0.914062 5.03125 1.13672 5.03125H8.05078L10.1836 5.14844L9.91406 5.59961L7.83398 3.68945L6.52148 2.36523C6.45508 2.29883 6.40039 2.22266 6.35742 2.13672C6.31836 2.04688 6.29883 1.94922 6.29883 1.84375C6.29883 1.64844 6.36523 1.48438 6.49805 1.35156C6.63086 1.21875 6.80469 1.15234 7.01953 1.15234C7.10938 1.15234 7.19727 1.17188 7.2832 1.21094C7.37305 1.24609 7.45898 1.30469 7.54102 1.38672L11.3789 5.21875C11.5312 5.36719 11.6074 5.54688 11.6074 5.75781Z" fill="currentColor" />
      )}
    </svg>
  )
}

export function SpinnerIcon({ className }) {
  return (
    <svg className={`size-6 animate-spin ${className ?? ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 12C18 13.1867 17.6481 14.3467 16.9888 15.3334C16.3295 16.3201 15.3925 17.0892 14.2961 17.5433C13.1997 17.9974 11.9933 18.1162 10.8295 17.8847C9.66557 17.6532 8.59647 17.0818 7.75736 16.2426C6.91824 15.4035 6.3468 14.3344 6.11529 13.1705C5.88378 12.0067 6.0026 10.8003 6.45672 9.7039C6.91085 8.60754 7.67988 7.67047 8.66658 7.01118C9.65327 6.35189 10.8133 6 12 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}
