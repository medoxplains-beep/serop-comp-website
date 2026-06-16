"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { type Product } from "@/lib/products"
import { useI18n } from "@/components/i18n-provider"

const WIPE_DUR = 0.7
const HOLD_MS  = 3500

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { locale, dict } = useI18n()
  const name        = locale === "ar" ? product.nameAr : product.name
  const description = locale === "ar" ? product.descriptionAr : product.description
  const orientationLabel = product.orientation === "vertical"
    ? dict.products.filters.vertical
    : product.orientation === "horizontal"
      ? dict.products.filters.horizontal
      : dict.products.filters.custom

  const variantImages = product.images ?? [product.image]
  const [variantStep, setVariantStep] = useState(0)
  const [isWipe,      setIsWipe]      = useState(false)
  const curV = variantStep % variantImages.length
  const nxtV = (variantStep + 1) % variantImages.length

  // Derive finish label dynamically from the current variant image
  const curFinish      = variantImages[curV].includes("galvanized") ? "galvanized" : product.finish
  const curFinishLabel = curFinish === "galvanized"
    ? dict.products.filters.galvanized
    : curFinish === "painted"
      ? dict.products.filters.painted
      : dict.products.filters.custom

  // Start wipe after hold period
  useEffect(() => {
    if (variantImages.length <= 1 || isWipe) return
    const t = setTimeout(() => setIsWipe(true), HOLD_MS)
    return () => clearTimeout(t)
  }, [variantStep, variantImages.length, isWipe])

  // Advance step after wipe completes
  useEffect(() => {
    if (!isWipe) return
    const t = setTimeout(() => { setVariantStep(v => v + 1); setIsWipe(false) }, WIPE_DUR * 1000 + 80)
    return () => clearTimeout(t)
  }, [isWipe])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition hover:border-primary/40"
    >
      {/* Image area — fixed aspect-[4/5] for all products */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-blueprint-fine"
      >
        {/* Incoming variant — wipes in from left */}
        <motion.div
          key={`in-${variantStep + 1}-${product.id}`}
          className="absolute inset-0"
          initial={false}
          animate={{
            clipPath: isWipe
              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          }}
          transition={isWipe ? { duration: WIPE_DUR, ease: [0.4, 0, 0.2, 1] } : { duration: 0 }}
        >
          <Image
            src={variantImages[nxtV]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain object-center p-6 drop-shadow-2xl"
          />
        </motion.div>

        {/* Current variant — wipes out to right */}
        <motion.div
          key={`out-${variantStep}-${product.id}`}
          className="absolute inset-0 z-10"
          initial={false}
          animate={{
            clipPath: isWipe
              ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
              : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          transition={isWipe ? { duration: WIPE_DUR, ease: [0.4, 0, 0.2, 1] } : { duration: 0 }}
        >
          <Image
            src={variantImages[curV]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain object-center p-6 drop-shadow-2xl transition duration-700 group-hover:scale-105"
            priority={index < 4}
          />
        </motion.div>

        {/* Vertical scan line */}
        {isWipe && (
          <motion.div
            key={`scan-${variantStep}-${product.id}`}
            className="pointer-events-none absolute inset-y-0 z-20 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(49,92,255,0.8) 20%, rgba(200,235,255,1) 50%, rgba(49,92,255,0.8) 80%, transparent 100%)",
              boxShadow: "0 0 8px 4px rgba(49,92,255,0.5), 0 0 20px 8px rgba(49,92,255,0.2)",
            }}
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration: WIPE_DUR, ease: [0.4, 0, 0.2, 1] }}
          />
        )}

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-card via-card/85 to-transparent" />

        {/* Variant indicator dots */}
        {variantImages.length > 1 && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
            {variantImages.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width:      i === curV ? "14px" : "5px",
                  background: i === curV ? "#315cff" : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>
        )}

        {/* Orientation + finish badges */}
        <div className="absolute left-4 top-4 z-30 flex flex-col gap-1.5">
          <span className="rounded-full bg-background/70 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-foreground backdrop-blur">
            {orientationLabel}
          </span>
          <motion.span
            key={curFinishLabel}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-full bg-background/70 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-foreground backdrop-blur"
          >
            {curFinishLabel}
          </motion.span>
        </div>
      </Link>

      {/* Card content */}
      <div className="relative -mt-12 bg-card/95 rounded-t-2xl px-6 pt-5 pb-6">
        <h3 className="font-display text-xl font-bold text-foreground">
          <Link href={`/products/${product.slug}`} className="hover:text-primary transition">
            {name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-5">
          {[
            { label: dict.products.card.specs.capacity, value: product.capacity },
            { label: dict.products.card.specs.working,  value: product.workingPressure },
            { label: dict.products.card.specs.test,     value: product.testPressure },
            { label: dict.products.card.specs.motor,    value: product.motorHP },
          ].map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
              <dd className="mt-0.5 text-sm font-semibold text-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex items-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-xs font-semibold text-primary-foreground transition hover:brightness-110"
          >
            {dict.products.card.view_details}
          </Link>
          <Link
            href="/request-quote"
            className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-foreground"
            aria-label={dict.products.card.request_quote}
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
