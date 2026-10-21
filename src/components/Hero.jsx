import HeroVideo from './HeroVideo'
import { TestFlightButton } from './Cta'
import { AppStoreWordmark, Stars } from './Icons'
import { content } from '../content'

export default function Hero() {
  return (
    <section className="section-frame h-dvh pb-4 short-phone:h-auto short-phone:min-h-dvh" data-section-group="hero" data-section-name="hero">
      <div className="section-content relative flex flex-1 flex-col-reverse justify-center items-center md:flex-row md:items-stretch md:gap-0 gap-8">
        <div className="flex shrink-0 flex-col gap-4 px-4 pb-6 md:flex-1 md:justify-center md:gap-6 md:pb-0 snug:pr-8 capped:pl-0 capped:pr-0 ">
          <h1 className="type-display text-balance font-medium text-black text-center md:text-left">{content.hero.headline}</h1>
          <p className="type-body text-balance text-black text-center md:text-left tracking-[-0.03em] md:max-w-[500px]">{content.hero.subheadline}</p>
          <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3 ">
            <TestFlightButton size="lg" layout="flex w-fit" />
          </div>
          <div
            className="flex flex-row items-center gap-3 md:gap-4 text-foreground justify-center md:justify-start opacity-50 md:pl-0.5"
            style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontVariantNumeric: 'tabular-nums' }}
          >
            <AppStoreWordmark className="hidden lg:block" />
            <div className="flex items-center gap-0.75 text-lg text-[18.5px] font-bold">400+ reviews</div>
            <div className="flex items-center gap-0.75 text-lg text-[18.5px] font-bold">
              <span>5.0</span>
              <span className="translate-y-0.75">
                <Stars score={5} size={22} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center md:flex-1 max-md:min-h-0 max-md:flex-1 max-md:max-w-[400px] max-md:max-h-[min(400px,100vw-2rem)] short-phone:max-h-none ">
          <div className="hidden md:block md:min-h-[36px] md:flex-1" />
          <HeroVideo />
          <div className="hidden md:block md:flex-1" />
        </div>
      </div>
    </section>
  )
}
