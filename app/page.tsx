import { HeroCinematic } from "@/components/hero-cinematic"
import { HeroMain } from "@/components/hero"
import { ProductShowcase } from "@/components/product-showcase"
import { Engineering } from "@/components/engineering"
import { Stats } from "@/components/stats"
import { Export } from "@/components/export"
import { Certifications } from "@/components/certifications"
import { WhyChoose } from "@/components/why-choose"
import { Clients } from "@/components/clients"
import { CTABanner } from "@/components/cta-banner"

export default function HomePage() {
  return (
    <>
      <HeroCinematic />
      <HeroMain />
      <ProductShowcase />
      <Engineering />
      <Stats />
      <Export />
      <Certifications />
      <WhyChoose />
      <Clients />
      <CTABanner />
    </>
  )
}

