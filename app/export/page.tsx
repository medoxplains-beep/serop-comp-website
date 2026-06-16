import type { Metadata } from "next"
import { FileText, Globe2, PackageCheck, Ship } from "lucide-react"
import { CTABanner } from "@/components/cta-banner"
import { Export as ExportSection } from "@/components/export"
import { PageHero } from "@/components/page-hero"
import { getRequestLocale } from "@/lib/get-request-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getRequestLocale())
  return {
    title: dict.exportPage.meta_title,
    description: dict.exportPage.meta_desc,
  }
}

export default async function ExportPage() {
  const dict = getDictionary(await getRequestLocale())
  const steps = [
    { icon: FileText, n: "01", title: dict.exportPage.steps.s1_title, desc: dict.exportPage.steps.s1_desc },
    { icon: PackageCheck, n: "02", title: dict.exportPage.steps.s2_title, desc: dict.exportPage.steps.s2_desc },
    { icon: Ship, n: "03", title: dict.exportPage.steps.s3_title, desc: dict.exportPage.steps.s3_desc },
    { icon: Globe2, n: "04", title: dict.exportPage.steps.s4_title, desc: dict.exportPage.steps.s4_desc },
  ]

  return (
    <>
      <PageHero
        eyebrow={dict.exportPage.hero_eyebrow}
        title={dict.exportPage.hero_title}
        description={dict.exportPage.hero_desc}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.export },
        ]}
      />
      <ExportSection />
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" />
            {dict.exportPage.process_eyebrow}
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {dict.exportPage.process_title}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
                <div className="font-mono text-xs uppercase tracking-widest text-primary">Step {s.n}</div>
                <div className="mt-4 grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner title={dict.exportPage.cta_title} description={dict.exportPage.cta_desc} />
    </>
  )
}
