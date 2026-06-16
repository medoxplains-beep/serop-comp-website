"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

export function CTABanner({
  title,
  description,
  primaryHref    = "/request-quote",
  primaryLabel,
  secondaryHref  = "/contact",
  secondaryLabel,
}: {
  title?:          string
  description?:    string
  primaryHref?:    string
  primaryLabel?:   string
  secondaryHref?:  string
  secondaryLabel?: string
}) {
  const { dict }         = useI18n()
  const finalTitle       = title          ?? dict.cta.title
  const finalDescription = description    ?? dict.cta.description
  const finalPrimary     = primaryLabel   ?? dict.cta.primary
  const finalSecondary   = secondaryLabel ?? dict.cta.secondary

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Animated gradient border wrapper */}
        <div
          className="relative rounded-3xl p-[1.5px] animate-gradient-shift"
          style={{
            background:
              "linear-gradient(135deg, #315cff 0%, #00a7ff 33%, #18d4ff 66%, #315cff 100%)",
            backgroundSize: "300% 300%",
          }}
        >
          {/* Light: crisp white/blue · Dark: deep navy */}
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-gradient-to-br from-white via-[#f0f8ff] to-[#e4f3ff] px-8 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16 dark:from-[#06111f] dark:via-[#081726] dark:to-[#030f1c]">

            {/* Floating orbs */}
            <div className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-[#315cff]/10 blur-[90px] animate-float-slow dark:bg-[#315cff]/20" />
            <div
              className="pointer-events-none absolute -bottom-16 -right-16 size-72 rounded-full bg-[#00a7ff]/10 blur-[70px] animate-float dark:bg-[#00a7ff]/18"
              style={{ animationDelay: "2.5s" }}
            />

            {/* Dot grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(49,92,255,0.7)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-[0.04] dark:[background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)]" />

            {/* Top edge shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#315cff]/18 to-transparent dark:via-white/22" />

            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              {/* Left: text */}
              <div>
                <div className="mb-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#315cff] dark:text-[#5cb8ff]">
                  <span className="h-px w-8 bg-[#315cff]/50 dark:bg-[#5cb8ff]/60" />
                  Get in touch
                  <span className="size-1.5 rounded-full bg-[#315cff]/45 dark:bg-[#5cb8ff]/55" />
                </div>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-balance text-[#0b1728] dark:text-white sm:text-4xl lg:text-5xl">
                  {finalTitle}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[#526173] dark:text-white/55">
                  {finalDescription}
                </p>
              </div>

              {/* Right: buttons */}
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  href={primaryHref}
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#315cff] to-[#00a7ff] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#315cff]/30 transition hover:brightness-110 hover:shadow-[#315cff]/50 hover:-translate-y-0.5"
                >
                  {finalPrimary}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center gap-3 rounded-full border border-[#315cff]/25 bg-[#315cff]/[0.07] px-7 py-4 text-sm font-bold text-[#315cff] backdrop-blur transition hover:border-[#315cff]/45 hover:bg-[#315cff]/12 hover:-translate-y-0.5 dark:border-white/22 dark:bg-white/[0.08] dark:text-white dark:hover:border-white/40 dark:hover:bg-white/[0.15]"
                >
                  <MessageCircle className="size-4" />
                  {finalSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
