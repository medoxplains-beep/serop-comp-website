import type { Metadata } from "next"
import { ClipboardList, FileCheck, Microscope, ShieldCheck } from "lucide-react"
import { Certifications } from "@/components/certifications"
import { CTABanner } from "@/components/cta-banner"
import { PageHero } from "@/components/page-hero"
import { getRequestLocale } from "@/lib/get-request-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getRequestLocale())
  return {
    title: dict.quality.meta_title,
    description: dict.quality.meta_desc,
  }
}

export default async function QualityPage() {
  const dict = getDictionary(await getRequestLocale())
  const pillars = [
    { icon: ShieldCheck, title: dict.quality.pillars.material_title, desc: dict.quality.pillars.material_desc },
    { icon: Microscope, title: dict.quality.pillars.weld_title, desc: dict.quality.pillars.weld_desc },
    { icon: ClipboardList, title: dict.quality.pillars.hydro_title, desc: dict.quality.pillars.hydro_desc },
    { icon: FileCheck, title: dict.quality.pillars.docs_title, desc: dict.quality.pillars.docs_desc },
  ]

  return (
    <>
      <PageHero
        eyebrow={dict.quality.hero_eyebrow}
        title={dict.quality.hero_title}
        description={dict.quality.hero_desc}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.quality },
        ]}
      />
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur">
                <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="size-6" />
                </div>
                <h2 className="mt-6 font-display text-xl font-bold">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Certifications />
      <CTABanner title={dict.quality.cta_title} description={dict.quality.cta_desc} />
    </>
  )
}
