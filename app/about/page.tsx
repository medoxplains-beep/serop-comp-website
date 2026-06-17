import type { Metadata } from "next"
import Image from "next/image"
import { Award, CheckCircle2, Eye, Target } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { CTABanner } from "@/components/cta-banner"
import { Stats } from "@/components/stats"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getRequestLocale } from "@/lib/get-request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getRequestLocale())
  return {
    title: dict.about.meta_title,
    description: dict.about.meta_desc,
  }
}

export default async function AboutPage() {
  const dict = getDictionary(await getRequestLocale())
  const values = [
    { icon: Target, title: dict.about.values.mission_title, desc: dict.about.values.mission_desc },
    { icon: Eye, title: dict.about.values.vision_title, desc: dict.about.values.vision_desc },
    { icon: Award, title: dict.about.values.values_title, desc: dict.about.values.values_desc },
  ]
  const milestones = [
    { year: "2009", title: dict.about.milestones.y2009_title, desc: dict.about.milestones.y2009_desc },
    { year: "2014", title: dict.about.milestones.y2014_title, desc: dict.about.milestones.y2014_desc },
    { year: "2021", title: dict.about.milestones.y2021_title, desc: dict.about.milestones.y2021_desc },
    { year: "2024", title: dict.about.milestones.y2024_title, desc: dict.about.milestones.y2024_desc },
    { year: "2025", title: dict.about.milestones.y2025_title, desc: dict.about.milestones.y2025_desc },
    { year: "2026", title: dict.about.milestones.y2026_title, desc: dict.about.milestones.y2026_desc },
  ]
  const storyPoints = [
    dict.about.points.experience,
    dict.about.points.markets,
    dict.about.points.certified,
    dict.about.points.team,
  ]

  return (
    <>
      <PageHero
        eyebrow={dict.about.hero_eyebrow}
        title={dict.about.hero_title}
        description={dict.about.hero_desc}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.about },
        ]}
      />

      <section className="relative py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60">
            <Image
              src="/images/tanks/vertical-900-blue.webp"
              alt="SEROP COMP factory floor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-transparent" />
          </div>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" />
              {dict.about.story_eyebrow}
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {dict.about.story_title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>{dict.about.story_p1}</p>
              <p>{dict.about.story_p2}</p>
              <p>{dict.about.story_p3}</p>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {storyPoints.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-foreground/90">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative bg-card/20 py-20 lg:py-28">
        <div className="absolute inset-0 bg-blueprint-fine opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur">
                <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="size-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" />
            {dict.about.milestones_label}
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {dict.about.milestones_title}
          </h2>
          <ol className="relative mt-12 border-l border-border/60 pl-8">
            {milestones.map((m) => (
              <li key={m.year} className="relative mb-10 last:mb-0">
                <div className="absolute -left-[37px] grid size-4 place-items-center rounded-full border border-primary bg-background">
                  <div className="size-1.5 rounded-full bg-primary" />
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-primary">{m.year}</div>
                <h3 className="mt-1 font-display text-lg font-bold">{m.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Stats />
      <CTABanner title={dict.about.cta_title} description={dict.about.cta_desc} />
    </>
  )
}
