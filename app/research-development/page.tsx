import type { Metadata } from "next"
import Image from "next/image"
import { FlaskConical, Layers, Settings2, Wrench } from "lucide-react"
import { CTABanner } from "@/components/cta-banner"
import { PageHero } from "@/components/page-hero"
import { getRequestLocale } from "@/lib/get-request-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getRequestLocale())
  return {
    title: dict.rd.meta_title,
    description: dict.rd.meta_desc,
  }
}

export default async function RDPage() {
  const dict = getDictionary(await getRequestLocale())
  const initiatives = [
    { icon: Wrench,       title: dict.rd.initiatives.welding_title,  desc: dict.rd.initiatives.welding_desc  },
    { icon: Settings2,    title: dict.rd.initiatives.fea_title,       desc: dict.rd.initiatives.fea_desc       },
    { icon: Layers,       title: dict.rd.initiatives.material_title,  desc: dict.rd.initiatives.material_desc  },
    { icon: FlaskConical, title: dict.rd.initiatives.process_title,   desc: dict.rd.initiatives.process_desc   },
  ]

  return (
    <>
      <PageHero
        eyebrow={dict.rd.hero_eyebrow}
        title={dict.rd.hero_title}
        description={dict.rd.hero_desc}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.rd },
        ]}
      />

      {/* Why R&D section */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                <span className="h-px w-8 bg-primary" />
                {dict.rd.why_eyebrow}
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {dict.rd.why_title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{dict.rd.why_p1}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{dict.rd.why_p2}</p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60 bg-card/30">
              <Image
                src="/images/tanks/vertical-1000-blue.webp"
                alt="SEROP COMP 1000L vertical pressure vessel"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="relative bg-card/20 py-20 lg:py-28">
        <div className="absolute inset-0 bg-blueprint-fine opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {initiatives.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur">
                <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title={dict.rd.cta_title} description={dict.rd.cta_desc} />
    </>
  )
}
