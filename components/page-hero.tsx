"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { fadeUp, fadeLeft, staggerContainer, tx, VP } from "@/lib/motion"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs: { label: string; href?: string }[]
}) {
  const reduced = useReducedMotion()
  const words = title.split(" ")

  return (
    <section className="relative overflow-hidden border-b border-white/60 bg-card/20 pt-32 pb-16 sm:pt-40 sm:pb-20 dark:border-white/10">

      {/* Blueprint bg */}
      <div className="absolute inset-0 bg-blueprint opacity-80" />

      {/* Animated ambient orbs */}
      {!reduced && (
        <>
          <div className="pointer-events-none absolute -left-32 top-0 size-[480px] rounded-full bg-[#315cff]/[0.08] blur-[100px] animate-orb dark:bg-[#315cff]/[0.14]" />
          <div className="pointer-events-none absolute -right-24 bottom-0 size-[360px] rounded-full bg-[#00a7ff]/[0.07] blur-[90px] animate-orb-alt dark:bg-[#00a7ff]/[0.12]" />
        </>
      )}

      {/* Top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#315cff]/55 to-transparent" />

      {/* Beam sweep */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden opacity-[0.04] dark:opacity-[0.06]">
          <div className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-[#315cff] to-transparent animate-beam" />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Breadcrumbs */}
        <motion.nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
          variants={reduced ? undefined : fadeLeft}
          initial={reduced ? false : "hidden"}
          animate="show"
          transition={tx(0.05, 0.6)}
        >
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3" />}
              {b.href ? (
                <Link href={b.href} className="transition hover:text-foreground">{b.label}</Link>
              ) : (
                <span className="text-foreground">{b.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        {/* Eyebrow */}
        {eyebrow && (
          <motion.div
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary"
            variants={reduced ? undefined : fadeUp}
            initial={reduced ? false : "hidden"}
            animate="show"
            transition={tx(0.1, 0.65)}
          >
            <span className="h-px w-8 bg-primary" />
            {eyebrow}
          </motion.div>
        )}

        {/* Title — word-by-word stagger */}
        <motion.h1
          className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl"
          variants={reduced ? undefined : staggerContainer(0.06, eyebrow ? 0.2 : 0.12)}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block me-[0.28em] last:me-0"
              variants={reduced ? undefined : {
                hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
                show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
            variants={reduced ? undefined : fadeUp}
            initial={reduced ? false : "hidden"}
            animate="show"
            transition={tx(eyebrow ? 0.42 : 0.32, 0.75)}
          >
            {description}
          </motion.p>
        )}

      </div>
    </section>
  )
}
