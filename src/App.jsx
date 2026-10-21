import Header from './components/Header'
import Hero from './components/Hero'
import Deck from './components/Deck'
import Expand from './components/Expand'
import Footer from './components/Footer'
import ScrollHint from './components/ScrollHint'
import ScrollProgressDots from './components/ProgressDots'

export default function App() {
  return (
    <main data-scroll-root="true" className="relative h-dvh snap-y snap-mandatory pointer-fine:snap-proximity overflow-y-auto bg-background">
      <ScrollHint />
      <ScrollProgressDots />
      <Header />
      <Hero />
      <Deck />
      <Expand />
      <Footer />
    </main>
  )
}
