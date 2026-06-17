"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, FileText, Gauge, Layers3, ShieldCheck } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

type DesignSlide = {
  src: string
  label: string
  title: string
  subtitle: string
  spec: string
}

const DESIGN_SLIDES: DesignSlide[] = [
  {
    src: "/images/tanks/vertical-2000-blue.png",
    label: "DESIGN 01",
    title: "Vertical receiver layout",
    subtitle: "Clean front elevation for high-flow compressed-air systems.",
    spec: "2000 L / Painted",
  },
  {
    src: "/images/tanks/vertical-3000-galvanized.png",
    label: "DESIGN 02",
    title: "Galvanized industrial finish",
    subtitle: "Corrosion-resistant configuration for demanding environments.",
    spec: "3000 L / Galvanized",
  },
  {
    src: "/images/tanks/horizontal-500-blue.png",
    label: "DESIGN 03",
    title: "Horizontal package receiver",
    subtitle: "Compact saddle-mounted design for compressor packages.",
    spec: "500 L / Horizontal",
  },
  {
    src: "/images/tanks/vertical-500-red.png",
    label: "DESIGN 04",
    title: "Custom coating route",
    subtitle: "Color-coded vessels prepared around your project identity.",
    spec: "500 L / Custom RAL",
  },
]

export function DesignLaunchHero() {
  const { locale, dict } = useI18n()
  const [active, setActive] = useState(0)
  const isAr = locale === "ar"
  const slide = DESIGN_SLIDES[active]
  const progress = ((active + 1) / DESIGN_SLIDES.length) * 100

  const copy = useMemo(
    () =>
      isAr
        ? {
            eyebrow: "تصميمات المنتج",
            title: "من الفكرة إلى خزان جاهز للاعتماد",
            body: "مساحة افتتاحية لعرض تصميمات المنتج قبل الدخول لتفاصيل الموقع. الصور تتبدل تلقائيا، وكل تصميم يبرز شكل الخزان والتشطيب وطريقة الاستخدام.",
            cta: dict.cta.primary,
            secondary: "استعرض المنتجات",
            proof: "جاهز للتصنيع والاختبار والتصدير",
            route: "Design route",
            scroll: "ادخل الموقع",
            stats: [
              ["4", "تصميمات افتتاحية"],
              ["10,000 L", "سعات كبيرة"],
              ["ISO / CE", "توثيق واعتماد"],
            ],
            steps: [
              ["تصميم واضح", "عرض المنتج بزاوية قوية ومناسبة للهوية."],
              ["هندسة قابلة للتنفيذ", "مواصفات تصنيع واختبار قبل التسليم."],
              ["توريد موثق", "مستندات جودة وتصدير جاهزة للعميل."],
            ],
          }
        : {
            eyebrow: "Product design showcase",
            title: "From concept visuals to certified vessels",
            body: "A premium opening section for product design visuals before the existing homepage. The gallery cycles through multiple design directions with a strong engineering story below.",
            cta: dict.cta.primary,
            secondary: "Explore products",
            proof: "Ready for fabrication, testing, and export",
            route: "Design route",
            scroll: "Enter website",
            stats: [
              ["4", "Opening designs"],
              ["10,000 L", "Large capacities"],
              ["ISO / CE", "Documented quality"],
            ],
            steps: [
              ["Clear visual route", "Show the vessel with a strong product angle."],
              ["Build-ready engineering", "Connect the render to manufacturing and testing."],
              ["Export-ready delivery", "Quality files and shipment documents prepared."],
            ],
          },
    [dict.cta.primary, isAr],
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % DESIGN_SLIDES.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [])

  const go = (direction: number) => {
    setActive((index) => (index + direction + DESIGN_SLIDES.length) % DESIGN_SLIDES.length)
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#eaf7ff] text-[#111b2a] dark:bg-[#04111f] dark:text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(32,54,107,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(32,54,107,.06)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_22%,rgba(0,167,255,.28),transparent_48%),linear-gradient(180deg,rgba(255,255,255,.92),rgba(202,239,255,.62)_58%,rgba(235,249,255,.96))] dark:bg-[radial-gradient(ellipse_at_50%_22%,rgba(0,167,255,.2),transparent_48%),linear-gradient(180deg,rgba(4,17,31,.94),rgba(7,30,52,.96)_58%,rgba(4,17,31,.98))]" />

      <div className="relative flex min-h-[100svh] flex-col pt-20">
        <div className="relative h-[48svh] min-h-[350px] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, scale: 1.04, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -18 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div className="absolute inset-x-0 bottom-0 top-12 bg-[radial-gradient(ellipse_at_50%_72%,rgba(49,92,255,.24),transparent_54%)]" />
              <Image
                src={slide.src}
                alt={`SEROP COMP ${slide.title}`}
                fill
                sizes="100vw"
                priority
                className="object-contain px-6 pb-7 pt-3 drop-shadow-[0_34px_70px_rgba(49,92,255,.22)]"
              />
              <div className="absolute inset-x-[18%] bottom-8 h-1 rounded-full bg-gradient-to-r from-transparent via-[#315cff]/70 to-transparent blur-[1px]" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute left-6 top-7 max-w-[360px] rounded-2xl border border-white/55 bg-white/55 p-4 shadow-xl shadow-[#315cff]/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/8 md:left-10">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-[#315cff] dark:text-[#8eb8ff]">
              {slide.label}
            </div>
            <div className="mt-2 font-display text-xl font-extrabold leading-tight">{slide.title}</div>
            <p className="mt-2 text-sm leading-6 text-[#526173] dark:text-white/64">{slide.subtitle}</p>
          </div>

          <div className="absolute right-6 top-7 hidden rounded-2xl border border-white/55 bg-white/55 p-4 shadow-xl shadow-[#315cff]/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/8 md:right-10 md:block">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground dark:text-white/42">
              {copy.route}
            </div>
            <div className="mt-2 text-2xl font-black text-[#315cff] dark:text-[#8eb8ff]">{slide.spec}</div>
          </div>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/60 bg-white/62 px-3 py-2 shadow-xl shadow-[#315cff]/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/8">
            <button
              onClick={() => go(-1)}
              className="grid size-9 place-items-center rounded-full border border-border/70 bg-white/70 text-[#315cff] transition hover:bg-[#315cff] hover:text-white dark:border-white/10 dark:bg-white/8 dark:text-white"
              aria-label="Previous design"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-2">
              {DESIGN_SLIDES.map((item, index) => (
                <button
                  key={item.src}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all ${index === active ? "w-9 bg-[#315cff]" : "w-2 bg-[#315cff]/22 dark:bg-white/24"}`}
                  aria-label={`Show ${item.label}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="grid size-9 place-items-center rounded-full border border-border/70 bg-white/70 text-[#315cff] transition hover:bg-[#315cff] hover:text-white dark:border-white/10 dark:bg-white/8 dark:text-white"
              aria-label="Next design"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#315cff] via-[#00a7ff] to-[#18d4ff] transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>

        <div className="relative flex flex-1 items-center border-t border-[#c6e4f3]/70 bg-white/28 px-6 py-6 backdrop-blur-sm dark:border-white/10 dark:bg-black/12">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#315cff]/20 bg-white/48 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#315cff] backdrop-blur dark:border-white/10 dark:bg-white/8 dark:text-[#8eb8ff]">
                <Layers3 className="size-4" />
                {copy.eyebrow}
              </div>
              <h1 className="max-w-4xl font-display text-4xl font-black leading-[0.96] tracking-tight text-[#111b2a] dark:text-white sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#526173] dark:text-white/62">{copy.body}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/request-quote"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#315cff] to-[#00a7ff] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-[#315cff]/18 transition hover:brightness-110"
                >
                  {copy.cta}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 rounded-full border border-[#315cff]/25 bg-white/48 px-6 py-3 text-sm font-bold text-[#111b2a] backdrop-blur transition hover:border-[#315cff]/60 hover:bg-white/72 dark:border-white/12 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
                >
                  {copy.secondary}
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-3">
                {copy.stats.map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-[#c6e4f3]/75 bg-white/48 p-3 shadow-lg shadow-[#315cff]/7 backdrop-blur dark:border-white/10 dark:bg-white/8">
                    <div className="font-display text-2xl font-black text-[#315cff] dark:text-[#8eb8ff]">{value}</div>
                    <div className="mt-1 text-xs font-semibold leading-5 text-[#526173] dark:text-white/55">{label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-[#c6e4f3]/75 bg-white/48 p-4 shadow-xl shadow-[#315cff]/8 backdrop-blur dark:border-white/10 dark:bg-white/8">
                <div className="mb-4 flex items-center gap-3 font-semibold">
                  <CheckCircle2 className="size-5 text-[#00a7ff]" />
                  {copy.proof}
                </div>
                <div className="grid gap-3 lg:grid-cols-3">
                  {copy.steps.map(([title, body], index) => {
                    const Icon = [Gauge, ShieldCheck, FileText][index]
                    return (
                      <div key={title} className="rounded-2xl border border-[#c6e4f3]/55 bg-white/42 p-3 dark:border-white/10 dark:bg-black/12">
                        <div className="mb-2 grid size-9 place-items-center rounded-xl bg-[#315cff]/10 text-[#315cff] dark:bg-white/8 dark:text-[#8eb8ff]">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <div className="font-bold">{title}</div>
                          <div className="mt-1 text-xs leading-5 text-[#526173] dark:text-white/56">{body}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <a
            href="#hero-cinematic"
            className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full border border-[#315cff]/18 bg-white/55 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#315cff] shadow-lg shadow-[#315cff]/8 backdrop-blur transition hover:bg-white/80 dark:border-white/10 dark:bg-white/8 dark:text-[#8eb8ff] md:inline-flex"
          >
            {copy.scroll}
          </a>
        </div>
      </div>
    </section>
  )
}
