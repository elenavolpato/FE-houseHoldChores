import Hero from "../components/Hero"
import BottomCallToAction from "../components/BottomCallToAction"
import Features from "../components/Features"

function Home() {
  return (
    <section className="flex flex-grow items-center justify-center">
      <div className="text-center">
        <Hero />
        <Features />
        <BottomCallToAction />
      </div>
    </section>
  )
}
export default Home
