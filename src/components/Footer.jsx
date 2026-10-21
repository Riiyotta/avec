import { GetNotifiedButton, TestFlightButton } from './Cta'
import { AvecLogo } from './Icons'
import ReviewsCarousel from './ReviewsCarousel'
import { content } from '../content'

function FooterHeadline({ headline }) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 md:hidden">
        <span className="type-display-footer block h-[1.2em] overflow-visible [&>svg]:h-full [&>svg]:w-auto [&>svg]:overflow-visible">
          <AvecLogo />
        </span>
        <h2 className="type-display-footer max-w-[735px] text-center font-medium text-black">
          {headline.split('\n').map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </h2>
      </div>
      <h2 className="type-display md:[@media(max-height:700px)]:type-hero hidden max-w-[735px] whitespace-pre-line pt-4 text-center font-medium text-black md:block">
        <span className="inline-flex translate-y-[0.1em] items-center">
          <span className="mr-3 inline-block h-[0.85em] shrink-0 [&>svg]:h-full [&>svg]:w-auto">
            <AvecLogo />
          </span>
        </span>
        {headline}
      </h2>
    </>
  )
}

const footerLinks = [
  { label: 'X', href: 'https://x.com/avec' },
  { label: 'YouTube', href: 'https://www.youtube.com/@avecmail' },
  { label: 'Instagram', href: 'https://www.instagram.com/avecmail/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/avec-ai' },
  { label: 'hi@avec.ai', href: 'mailto:hi@avec.ai' },
]
const legal = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]
const COPY = 'Copyright © 2025-2026 Nearly Extraterrestrial Technology, Inc.'

export default function Footer() {
  return (
    <footer className="section-frame min-h-dvh snap-start" data-section-group="footer" data-section-name="footer">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 max-md:min-h-[calc(100dvh-96px)] md:px-10">
        <FooterHeadline headline={content.footer.headline} />
        <div className="flex w-full flex-col items-center gap-4 md:[@media(min-height:701px)]:-mt-4">
          <div className="flex w-full flex-col items-stretch gap-2 md:w-auto md:flex-row md:items-center md:gap-3">
            <TestFlightButton size="lg" layout="flex w-full justify-center md:w-fit md:justify-start" />
            <GetNotifiedButton size="lg" layout="flex w-full justify-center md:w-fit md:justify-start" />
          </div>
        </div>
        <div className="-mx-10 md:mx-0 pt-4 md:pt-10 self-stretch">
          <ReviewsCarousel />
        </div>
      </div>
      <div className="mx-6 mb-0 snap-end md:mx-10">
        <div className="h-px bg-black/10" />
        <div className="type-caption hidden grid-cols-2 items-start gap-x-6 gap-y-3 py-4 text-black max-[452px]:grid">
          <p className="col-span-2">{COPY}</p>
          <div className="flex flex-col gap-3">
            {footerLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {legal.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="type-caption flex flex-col items-center gap-4 py-4 text-black max-[452px]:hidden md:flex-row md:justify-between md:py-[22px] md:flex-wrap">
          <p className="text-center">{COPY}</p>
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {footerLinks.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <span className="max-md:hidden text-black/30">·</span>
              {legal.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
