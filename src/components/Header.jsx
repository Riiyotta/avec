import { AvecWordmark } from './Icons'
import { GetNotifiedButton, TestFlightButton } from './Cta'

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex justify-center md:px-4 md:pt-0">
      <div className="section-content flex items-center justify-between rounded-b-[20px] bg-white px-4 md:px-3 py-3 shadow-[0px_1px_21px_0px_rgba(0,0,0,0.05),0px_11px_9px_0px_rgba(0,0,0,0.03),0px_2px_4px_0px_rgba(0,0,0,0.02)]">
        <a aria-label="Avec home" className="shrink-0" href="/">
          <AvecWordmark className="h-6 md:h-8 w-auto" />
        </a>
        <div className="flex shrink-0 items-center gap-[7px]">
          <TestFlightButton size="sm" layout="flex w-fit" />
          <GetNotifiedButton size="sm" layout="w-fit hidden md:flex" />
        </div>
      </div>
    </header>
  )
}
