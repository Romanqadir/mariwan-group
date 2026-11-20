import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Showcase from './components/Showcase'
import Films from './components/Films'
import Decor from './components/Decor'
import Packages from './components/Packages'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Footer, { FloatingWhatsApp, ScrollProgress } from './components/Footer'

export default function App() {
  return (
    <div className="grain">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Showcase />
        <Films />
        <Decor />
        <Packages />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
