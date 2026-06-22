"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion"
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight, Zap, Shield, Gauge, Ruler } from "lucide-react"
import {
  showcaseProducts,
  filterProducts,
  type ShowcaseProduct,
} from "@/lib/products-showcase"
import { useI18n } from "@/components/i18n-provider"

// ── Color maps ─────────────────────────────────────────
const colorGlow: Record<string, string> = {
  red:        "rgba(49,92,255,0.28)",
  blue:       "rgba(49,92,255,0.28)",
  gray:       "rgba(100,116,139,0.18)",
  galvanized: "rgba(148,163,184,0.18)",
}
const colorAccent: Record<string, string> = {
  red:        "#315cff",
  blue:       "#315cff",
  gray:       "#94a3b8",
  galvanized: "#cbd5e1",
}

// ── Magnetic button ────────────────────────────────────
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })
  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMove} onMouseLeave={reset} className={className}>
      {children}
    </motion.div>
  )
}

// ── Spec pill (on hover) ───────────────────────────────
function SpecPill({ icon: Icon, label, value, accent }: {
  icon: React.ElementType; label: string; value: string; accent: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1.5 backdrop-blur dark:border-white/10 dark:bg-white/5">
      <Icon className="size-3.5 shrink-0" style={{ color: accent }} />
      <span className="min-w-0 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground dark:text-white/50 sm:text-[9px] sm:tracking-widest">{label}</span>
      <span className="min-w-0 break-words font-mono text-[11px] font-bold text-foreground dark:text-white/90 sm:text-xs">{value}</span>
    </div>
  )
}

// ── Thumbnail ──────────────────────────────────────────
function ProductThumb({ product, active, onClick }: {
  product: ShowcaseProduct; active: boolean; onClick: () => void
}) {
  const accent = colorAccent[product.color]
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex shrink-0 flex-col items-center gap-1.5 rounded-xl border p-2 transition-colors"
      style={{
        borderColor: active ? accent : undefined,
        background:  active ? `${colorGlow[product.color]}` : undefined,
        boxShadow:   active ? `0 0 18px ${colorGlow[product.color]}` : undefined,
      }}
      data-active={active}
    >
      <div className="relative h-20 w-14 overflow-hidden rounded-lg">
        <Image src={product.image} alt={product.name} fill sizes="56px" className="object-contain" />
      </div>
      <span className="font-mono text-[9px] font-bold text-muted-foreground dark:text-white/70">{product.capacity}</span>
      {active && (
        <motion.div layoutId="thumb-indicator" className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full" style={{ background: accent }} />
      )}
    </motion.button>
  )
}

// ── Filter pill ────────────────────────────────────────
function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-all ${
        active
          ? "bg-[#315cff]/15 text-[#315cff] border border-[#315cff]/40 dark:bg-[#315cff]/20 dark:text-[#7c9bff]"
          : "border border-border/60 text-muted-foreground hover:text-foreground dark:border-white/10 dark:text-white/40 dark:hover:text-white/70"
      }`}
    >
      {label}
    </button>
  )
}

// ── Data row ───────────────────────────────────────────
function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-white/35">{label}</dt>
      <dd className="mt-0.5 font-mono text-sm font-bold capitalize text-foreground dark:text-white/90">{value}</dd>
    </div>
  )
}

// ── Main component ─────────────────────────────────────
export function ProductShowcase() {
  const { locale, dict } = useI18n()
  const isAr = locale === "ar"
  const s = dict.showcase
  const prefersReduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const reducedMotion = Boolean(prefersReduced || isMobile)

  const orientationFilters = [
    { value: "all",        label: s.filters.all        },
    { value: "vertical",   label: s.filters.vertical   },
    { value: "horizontal", label: s.filters.horizontal },
  ]
  const finishFilters = [
    { value: "all",        label: s.filters.all        },
    { value: "painted",    label: s.filters.painted    },
    { value: "galvanized", label: s.filters.galvanized },
  ]
  const capacityFilters = [
    { value: "all",       label: s.filters.all    },
    { value: "up-to-100", label: s.filters.small  },
    { value: "100-500",   label: s.filters.medium },
    { value: "500-2000",  label: s.filters.large  },
    { value: "2000+",     label: s.filters.xlarge },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [showProductsMascot, setShowProductsMascot] = useState(false)
  const [capacityFilter, setCapacityFilter]       = useState("all")
  const [orientationFilter, setOrientationFilter] = useState("all")
  const [finishFilter, setFinishFilter]           = useState("all")
  const [autoKey, setAutoKey] = useState(0)

  // ── Multi-image variant wipe state ──────────────────────
  const [variantStep, setVariantStep]     = useState(0)
  const [isVariantWipe, setIsVariantWipe] = useState(false)
  const VARIANT_WIPE_DUR = 0.75
  const VARIANT_HOLD_MS  = 3200

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)")
    const sync = () => setIsMobile(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  const filtered  = filterProducts(showcaseProducts, capacityFilter, orientationFilter, finishFilter)
  const safeIndex = Math.min(activeIndex, filtered.length - 1)
  const product   = filtered[safeIndex] ?? showcaseProducts[0]
  const accent    = colorAccent[product.color]
  const glow      = colorGlow[product.color]

  // variant images for current product
  const variantImages  = product.images ?? [product.image]
  const curVariant     = variantStep % variantImages.length
  const nxtVariant     = (variantStep + 1) % variantImages.length
  const isHorizontal   = product.orientation === "horizontal"
  const curFinish      = variantImages[curVariant]?.includes("galvanized") ? "galvanized" : product.finish

  const prev = () => { setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length); setAutoKey((k) => k + 1) }
  const next = () => { setActiveIndex((i) => (i + 1) % filtered.length); setAutoKey((k) => k + 1) }

  useEffect(() => {
    if (reducedMotion) return
    if (hovering) return
    const id = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % filtered.length)
      setAutoKey((k) => k + 1)
    }, 3000)
    return () => clearTimeout(id)
  }, [autoKey, hovering, filtered.length, reducedMotion])

  // Reset variant when switching products
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setVariantStep(0)
      setIsVariantWipe(false)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [product.id])

  // Auto-cycle variants for multi-image products
  useEffect(() => {
    if (reducedMotion) return
    if (variantImages.length <= 1 || hovering || isVariantWipe) return
    const t = setTimeout(() => setIsVariantWipe(true), VARIANT_HOLD_MS)
    return () => clearTimeout(t)
  }, [variantStep, variantImages.length, hovering, isVariantWipe, VARIANT_HOLD_MS, reducedMotion])

  // Advance variant after wipe completes
  useEffect(() => {
    if (!isVariantWipe) return
    const t = setTimeout(() => { setVariantStep((v) => v + 1); setIsVariantWipe(false) }, VARIANT_WIPE_DUR * 1000 + 80)
    return () => clearTimeout(t)
  }, [isVariantWipe, VARIANT_WIPE_DUR])

  // Products mascot: appear → stay 7s → disappear → wait 18s → repeat
  useEffect(() => {
    if (reducedMotion) return
    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>
    const cycle = () => {
      setShowProductsMascot(true)
      t2 = setTimeout(() => {
        setShowProductsMascot(false)
        t1 = setTimeout(cycle, 18000)
      }, 7000)
    }
    t1 = setTimeout(cycle, 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [reducedMotion])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const imgX   = useTransform(mouseX, [-1, 1], [-8, 8])
  const imgY   = useTransform(mouseY, [-1, 1], [-6, 6])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }
  const resetMouse = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <section id="products" dir={isAr ? "rtl" : "ltr"} className="relative scroll-mt-28 overflow-hidden py-16 sm:py-20 lg:py-32">
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-background dark:bg-[#06111f]" />
      <div className="absolute inset-0 bg-blueprint opacity-20 dark:opacity-30" />
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 55% 55% at 62% 45%, ${glow}, transparent)` }}
      />

      {/* Animated blueprint lines */}
      <svg className="pointer-events-none absolute inset-0 hidden size-full opacity-[0.07] dark:opacity-[0.12] md:block" viewBox="0 0 1200 800" fill="none" aria-hidden>
        <defs>
          <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#315cff" stopOpacity="0" />
            <stop offset="50%" stopColor="#315cff" stopOpacity="1" />
            <stop offset="100%" stopColor="#315cff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[80, 200, 360, 500, 640, 740].map((y, i) => (
          <motion.line key={`h${i}`} x1="0" y1={y} x2="1200" y2={y}
            stroke="url(#lineGrad)" strokeWidth="0.5" strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.15 }}
          />
        ))}
        {[100, 260, 460, 680, 880, 1060].map((x, i) => (
          <motion.line key={`v${i}`} x1={x} y1="0" x2={x} y2="800"
            stroke="#315cff" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="4 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: i * 0.1 }}
          />
        ))}
      </svg>

      {/* Products mascot — slides in from left, stays, then disappears */}
      <AnimatePresence>
        {showProductsMascot && (
          <motion.div
            className="pointer-events-none absolute bottom-24 end-8 z-30 hidden lg:block"
            initial={{ x: -480, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -480, opacity: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
          >
            <video
              src="/mascot/products.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="w-64 xl:w-80"
              style={{ filter: "brightness(1.45) contrast(1.05)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#315cff] dark:text-[#5c7cff]">
              <span className="h-px w-8 bg-[#315cff]" />
              {s.eyebrow}
            </div>
            <h2 className="max-w-full text-balance font-display text-[clamp(2.1rem,11vw,3.5rem)] font-bold leading-[1.02] tracking-tight sm:text-4xl lg:text-5xl">
              <span className="title-shine">{s.title1} {s.title2}</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-1.5">
              {orientationFilters.map((f) => (
                <FilterPill key={f.value} label={f.label} active={orientationFilter === f.value}
                  onClick={() => { setOrientationFilter(f.value); setActiveIndex(0); setAutoKey((k) => k + 1) }} />
              ))}
            </div>
            <div className="hidden h-5 w-px bg-border/60 dark:bg-white/10 sm:block" />
            <div className="flex flex-wrap gap-1.5">
              {finishFilters.map((f) => (
                <FilterPill key={f.value} label={f.label} active={finishFilter === f.value}
                  onClick={() => { setFinishFilter(f.value); setActiveIndex(0); setAutoKey((k) => k + 1) }} />
              ))}
            </div>
            <div className="hidden h-5 w-px bg-border/60 dark:bg-white/10 sm:block" />
            <div className="flex flex-wrap gap-1.5">
              {capacityFilters.map((f) => (
                <FilterPill key={f.value} label={f.label} active={capacityFilter === f.value}
                  onClick={() => { setCapacityFilter(f.value); setActiveIndex(0); setAutoKey((k) => k + 1) }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Main showcase ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

          {/* Featured product */}
          <div className="relative lg:col-span-7 lg:order-2" onMouseMove={handleMouse} onMouseLeave={resetMouse}>
            {/* Glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl transition-all duration-700"
              style={{ boxShadow: hovering ? `0 0 60px ${glow}` : `0 0 30px ${glow}` }} />

            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 shadow-xl backdrop-blur dark:border-white/10 dark:bg-black/40">
              {/* Top bar */}
              <div className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3 dark:border-white/8 sm:px-6">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="size-2 rounded-full" style={{ background: accent }} />
                  <motion.span
                    key={curFinish}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground dark:text-white/40"
                  >
                    {product.orientation} · {curFinish}
                  </motion.span>
                </div>
                <div className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 dark:text-white/30">
                  {product.certification}
                </div>
              </div>

              {/* Auto-scroll progress bar */}
              {!hovering && (
                <motion.div
                  key={autoKey}
                  className="h-[2px] origin-left"
                  style={{ background: accent }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              )}

              {/* Image area */}
              <div className="relative flex items-center justify-center px-3 pb-4 pt-20 sm:px-8 sm:pt-16"
                onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>

                {/* Always-visible spec pills above the tank */}
                <div className="absolute left-0 right-0 top-4 z-20 flex justify-center gap-2 px-3 sm:gap-3 sm:px-8">
                  <AnimatePresence mode="wait">
                    <motion.div key={`motor-${product.id}`} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="flex max-w-full flex-wrap justify-center gap-2 sm:gap-3">
                      <SpecPill icon={Zap}   label={s.pill_motor} value={product.recommendedMotor} accent={accent} />
                      <SpecPill icon={Ruler} label={s.pill_size}  value={product.dimensions}       accent={accent} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dimension lines */}
                <svg className="pointer-events-none absolute inset-0 hidden size-full sm:block" viewBox="0 0 600 400" fill="none" aria-hidden>
                  <motion.line x1="80" y1="60" x2="520" y2="60"
                    stroke={accent} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                  <motion.line x1="80" y1="340" x2="520" y2="340"
                    stroke={accent} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
                  <text x="86" y="54" fill={accent} fontSize="9" opacity="0.6" fontFamily="monospace" direction="ltr">
                    {product.dimensions}
                  </text>
                  <text x="86" y="356" fill={accent} fontSize="9" opacity="0.6" fontFamily="monospace" direction="ltr">
                    SEROP COMP · {product.capacity}
                  </text>
                </svg>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.id}
                    style={{ x: imgX, y: imgY }}
                    initial={{ opacity: 0, scale: 0.85, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                  >
                    <motion.div
                      animate={{ rotateY: hovering ? 3 : 0, rotateX: hovering ? -2 : 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      style={{ transformPerspective: 800 }}
                    >
                      <div className={`relative overflow-hidden rounded-2xl border border-border/40 dark:border-white/10 transition-all duration-300 ${
                        isHorizontal
                          ? "h-40 w-[min(78vw,18rem)] lg:h-56 lg:w-[30rem]"
                          : "h-72 w-[min(72vw,16rem)] lg:h-[30rem] lg:w-[22rem]"
                      }`}>

                        {/* Layer A: incoming variant — slides in from right */}
                        <motion.div
                          key={`in-${variantStep + 1}-${product.id}`}
                          className="absolute inset-0"
                          initial={false}
                          animate={{
                            clipPath: isVariantWipe
                              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                              : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                          }}
                          transition={isVariantWipe ? { duration: VARIANT_WIPE_DUR, ease: [0.4, 0, 0.2, 1] } : { duration: 0 }}
                        >
                          <Image
                            src={variantImages[nxtVariant]} alt={product.name} fill
                            sizes="(max-width: 1024px) 288px, 480px"
                            className="object-contain"
                          />
                        </motion.div>

                        {/* Layer B: current variant — slides out to left */}
                        <motion.div
                          key={`out-${variantStep}-${product.id}`}
                          className="absolute inset-0 z-10"
                          initial={false}
                          animate={{
                            clipPath: isVariantWipe
                              ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                              : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                          }}
                          transition={isVariantWipe ? { duration: VARIANT_WIPE_DUR, ease: [0.4, 0, 0.2, 1] } : { duration: 0 }}
                        >
                          <Image
                            src={variantImages[curVariant]} alt={product.name} fill
                            sizes="(max-width: 1024px) 288px, 480px"
                            className="object-contain"
                            priority
                          />
                        </motion.div>

                        {/* Vertical scan line */}
                        {isVariantWipe && (
                          <motion.div
                            key={`scan-${variantStep}-${product.id}`}
                            className="pointer-events-none absolute inset-y-0 z-20 w-[2px]"
                            style={{
                              background: "linear-gradient(to bottom, transparent 0%, rgba(49,92,255,0.8) 20%, rgba(200,235,255,1) 50%, rgba(49,92,255,0.8) 80%, transparent 100%)",
                              boxShadow: "0 0 8px 4px rgba(49,92,255,0.5), 0 0 20px 8px rgba(49,92,255,0.2)",
                            }}
                            initial={{ left: "0%" }}
                            animate={{ left: "100%" }}
                            transition={{ duration: VARIANT_WIPE_DUR, ease: [0.4, 0, 0.2, 1] }}
                          />
                        )}

                        {/* Gradient overlays */}
                        <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-background/40 via-transparent to-transparent dark:from-black/60" />
                        <div className="pointer-events-none absolute inset-0 z-30 opacity-15 mix-blend-multiply dark:mix-blend-screen"
                          style={{ background: `radial-gradient(circle at 50% 30%, ${accent}, transparent 70%)` }} />

                        {/* Variant dots (for multi-image products) */}
                        {variantImages.length > 1 && (
                          <div className="pointer-events-none absolute bottom-2 left-1/2 z-40 flex -translate-x-1/2 gap-1.5">
                            {variantImages.map((_, i) => (
                              <div
                                key={i}
                                className="h-1 rounded-full transition-all duration-300"
                                style={{
                                  width:      i === curVariant ? "14px" : "5px",
                                  background: i === curVariant ? accent : "rgba(255,255,255,0.45)",
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                  {hovering && (
                    <>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="absolute left-6 top-1/3">
                        <SpecPill icon={Gauge}  label={s.pill_working} value={product.workingPressure} accent={accent} />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="absolute right-6 top-1/4">
                        <SpecPill icon={Shield} label={s.pill_test}    value={product.testPressure}    accent={accent} />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

              </div>

              {/* Bottom info */}
              <div className="border-t border-border/50 px-4 py-5 dark:border-white/8 sm:px-6">
                <AnimatePresence mode="wait">
                  <motion.div key={product.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <h3 className="font-display text-xl font-bold text-foreground dark:text-white">{isAr ? product.nameAr : product.name}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground dark:text-white/40">{product.dimensions} · {product.warranty} {s.warranty_label}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-5 flex flex-wrap gap-3">
                  <MagneticButton>
                    <Link href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition"
                      style={{ background: accent }}>
                      {s.view_product} <ArrowRight className="size-4" />
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link href={`/request-quote?product=${product.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-muted dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                      {s.request_quote}
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <a href="https://wa.me/201151988818" target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border/40 px-5 py-2.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground dark:border-white/10 dark:text-white/60 dark:hover:text-white">
                      <MessageCircle className="size-4" /> {s.whatsapp}
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Prev / Next */}
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full border border-border/60 bg-card/80 text-foreground/60 backdrop-blur transition hover:text-foreground dark:border-white/10 dark:bg-black/60 dark:text-white/60 dark:hover:text-white sm:-left-4">
              <ChevronLeft className="size-4" />
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full border border-border/60 bg-card/80 text-foreground/60 backdrop-blur transition hover:text-foreground dark:border-white/10 dark:bg-black/60 dark:text-white/60 dark:hover:text-white sm:-right-4">
              <ChevronRight className="size-4" />
            </button>

          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-6 lg:col-span-5 lg:order-1">
            {/* Full specs card */}
            <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/40">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-widest" style={{ color: accent }}>
                {s.tech_sheet}
              </div>
              <AnimatePresence mode="wait">
                <motion.dl key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 gap-x-4 gap-y-4">
                  {[
                    [s.specs.capacity,         product.capacity],
                    [s.specs.working_pressure, product.workingPressure],
                    [s.specs.test_pressure,    product.testPressure],
                    [s.specs.dimensions,       product.dimensions],
                    [s.specs.finish,           product.finish],
                    [s.specs.motor,            product.recommendedMotor],
                    [s.specs.warranty,         product.warranty],
                    [s.specs.certification,    product.certification],
                  ].map(([k, v]) => <DataRow key={k} label={k} value={v} />)}
                </motion.dl>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/40">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground dark:text-white/30">
                {filtered.length} {s.products_count}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {filtered.map((p, i) => (
                  <ProductThumb key={p.id} product={p} active={i === safeIndex} onClick={() => { setActiveIndex(i); setAutoKey((k) => k + 1) }} />
                ))}
              </div>
            </div>

            {/* Counter */}
            <div className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/30 px-5 py-3 dark:border-white/8 dark:bg-black/20">
              <span className="font-mono text-xs text-muted-foreground dark:text-white/30">
                {safeIndex + 1} / {filtered.length}
              </span>
              <div className="flex gap-1">
                {filtered.slice(0, Math.min(filtered.length, 10)).map((_, i) => (
                  <button key={i} onClick={() => { setActiveIndex(i); setAutoKey((k) => k + 1) }}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width:      i === safeIndex ? "20px" : "6px",
                      background: i === safeIndex ? accent : undefined,
                    }}
                  />
                ))}
              </div>
              <Link href="/products" className="font-mono text-[10px] uppercase tracking-widest hover:underline" style={{ color: accent }}>
                {s.view_all}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
