import Hero from "@/features/landing/Hero"
import BottomCallToAction from "@/features/landing/BottomCallToAction"
import Features from "@/features/landing/Features"
import Footer from "@/features/landing/Footer"

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
