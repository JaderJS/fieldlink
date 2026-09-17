import { Header } from "@/src/components/custom/global/nav/navbar"
import { Button } from "@/src/components/ui/button"
import HeroSection from "./_components/home.section"

export default function Home() {
  return (
    <div className="relative w-full">
      <Header />
      <HeroSection />
    </div>
  )
}
