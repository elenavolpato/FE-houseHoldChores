import Hero from "../components/Hero"
import BottomCallToAction from "../components/BottomCallToAction"
import Features from "../components/Features"
import Footer from "../components/Footer"

function LandingPage() {
  return (
    <section className="flex flex-grow items-center justify-center">
      <div className="text-center">
        <Hero />
        <Features />
        <BottomCallToAction />
        <Footer />
      </div>
    </section>
  )
}
export default LandingPage
