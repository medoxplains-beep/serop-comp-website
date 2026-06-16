"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FileCheck, Globe2, MapPin, Navigation, Package, Ship } from "lucide-react"
import { SectionHeader } from "./section-header"
import { useI18n } from "@/components/i18n-provider"

/* ── Geographic coordinates (full equirectangular 360×180°) ─────────────
   x = (longitude + 180) / 360 × 100
   y = (90 - latitude)  / 180 × 100
─────────────────────────────────────────────────────────────────────── */
const countries = [
  { name: "Saudi Arabia", nameAr: "السعودية", code: "SA", x: 63.0, y: 36.3 },
  { name: "Kenya",        nameAr: "كينيا",    code: "KE", x: 60.2, y: 50.7 },
  { name: "Morocco",      nameAr: "المغرب",   code: "MA", x: 48.1, y: 31.1 },
  { name: "UAE",          nameAr: "الإمارات", code: "AE", x: 65.1, y: 36.4 },
  { name: "Sudan",        nameAr: "السودان",  code: "SD", x: 59.0, y: 41.3 },
  { name: "Jordan",       nameAr: "الأردن",   code: "JO", x: 60.0, y: 32.3 },
]

const origin = { x: 58.7, y: 33.3 } /* Cairo, Egypt */

const features = [
  { icon: Ship,      title: "shipping_title", desc: "shipping_desc" },
  { icon: Package,   title: "packing_title",  desc: "packing_desc"  },
  { icon: FileCheck, title: "docs_title",     desc: "docs_desc"     },
  { icon: Globe2,    title: "delivery_title", desc: "delivery_desc" },
] as const

export function Export() {
  const { locale, dict } = useI18n()
  const isAr = locale === "ar"

  return (
    <section id="export" className="relative py-14 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={dict.export.eyebrow}
          title={dict.export.title}
          description={dict.export.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* ── Map card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[380px] overflow-hidden rounded-2xl border border-border/70 bg-white/35 p-5 shadow-2xl shadow-[#315cff]/10 backdrop-blur dark:border-[#00a7ff]/18 dark:bg-[#0b1d33]/60 dark:shadow-[#06111f]/40 sm:p-8 lg:col-span-7 lg:min-h-[620px]"
          >
            <div className="relative z-10 flex h-full flex-col gap-6">

              {/* Header row */}
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {dict.export.markets_label}
                  </div>
                  <div className="mt-1 font-display text-4xl font-bold text-foreground lg:text-5xl">
                    {dict.export.markets_count}{" "}
                    <span className="align-middle text-base font-medium text-muted-foreground">
                      {dict.export.markets_unit}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/55 px-3 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                  <Navigation className="size-4" />
                  {dict.export.route_label}
                </div>
              </div>

              {/* Map area */}
              <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl border border-white/55 dark:border-white/10 sm:min-h-[420px]">

                {/* Real world map image */}
                <Image
                  src="/images/world-map.png"
                  alt="World export markets map"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-center"
                  priority
                />

                {/* Tint overlay: light in light mode, dark in dark mode */}
                <div className="absolute inset-0 bg-white/20 dark:bg-[#06111f]/70" />

                {/* Route lines SVG — viewBox 0 0 100 100 + preserveAspectRatio="none"
                    so SVG coordinates map 1:1 to CSS left/top percentages */}
                <svg
                  className="absolute inset-0 size-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="exportRoute" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%"   stopColor="#315cff" stopOpacity="0.14" />
                      <stop offset="55%"  stopColor="#00a7ff" stopOpacity="0.72" />
                      <stop offset="100%" stopColor="#18d4ff" stopOpacity="0.96" />
                    </linearGradient>
                    <filter id="pinGlow">
                      <feGaussianBlur stdDeviation="1.1" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {countries.map((country, index) => (
                    <motion.path
                      key={`route-${country.code}`}
                      d={`M ${origin.x} ${origin.y} Q ${(origin.x + country.x) / 2} ${
                        Math.min(origin.y, country.y) - 10 - index * 0.6
                      } ${country.x} ${country.y}`}
                      stroke="url(#exportRoute)"
                      strokeWidth="0.35"
                      strokeDasharray="1.4 1.4"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.1 + index * 0.09 }}
                    />
                  ))}

                  {/* Origin pulse rings */}
                  <circle cx={origin.x} cy={origin.y} r="2.2" fill="#315cff" opacity="0.15" />
                  <circle cx={origin.x} cy={origin.y} r="1.1" fill="#ffffff" filter="url(#pinGlow)" />
                </svg>

                {/* Origin label — Egypt */}
                <div
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00a7ff]/40 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#20366b] shadow-lg shadow-[#315cff]/20 backdrop-blur dark:bg-[#06111f]/90 dark:text-white"
                  style={{ left: `${origin.x}%`, top: `${origin.y}%` }}
                >
                  {dict.export.origin}
                </div>

                {/* Country pins */}
                {countries.map((country, index) => (
                  <motion.div
                    key={country.code}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-full"
                    style={{ left: `${country.x}%`, top: `${country.y}%` }}
                  >
                    <div className="group relative">
                      <span className="absolute left-1/2 top-7 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-[#00a7ff] to-transparent" />
                      <span className="absolute left-1/2 top-7 size-4 -translate-x-1/2 rounded-full bg-[#00c8ff]/30 blur-md" />
                      <div className="flex items-center gap-2 rounded-full border border-[#00a7ff]/30 bg-white/94 px-3 py-1.5 text-xs font-semibold text-[#0b1728] shadow-lg shadow-[#315cff]/15 backdrop-blur transition group-hover:-translate-y-0.5 group-hover:border-[#00a7ff]/70">
                        <MapPin className="size-3.5 fill-[#315cff] text-[#315cff]" />
                        <span className="font-mono text-[#315cff]">{country.code}</span>
                        <span className="hidden sm:inline">{isAr ? country.nameAr : country.name}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Bottom country chips */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-wrap gap-2" dir={isAr ? "rtl" : "ltr"}>
                  {countries.map((country) => (
                    <div
                      key={`chip-${country.code}`}
                      className="rounded-full border border-[#00a7ff]/18 bg-white/80 px-3 py-1 text-xs font-medium text-[#20366b] shadow-sm backdrop-blur dark:bg-[#06111f]/72 dark:text-white"
                    >
                      <span className={isAr ? "ml-2 font-mono text-[#8eb8ff]" : "mr-2 font-mono text-[#8eb8ff]"}>
                        {country.code}
                      </span>
                      {isAr ? country.nameAr : country.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Feature cards ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur transition hover:border-primary/40"
              >
                <div className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {dict.export.features[f.title]}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {dict.export.features[f.desc]}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
