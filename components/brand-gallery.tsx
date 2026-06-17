"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"

type SlideData = {
  src: string
  eyebrow: string
  titleFill: string
  titleOutline: string
  body: string
  stat: string
  statLabel: string
}

const SLIDES: SlideData[] = [
  {
    src: "/images/gallery/01.webp",
    eyebrow: "PRESSURE VESSELS · SINCE 2009",
    titleFill: "Engineering",
    titleOutline: "Precision",
    body: "Over 5,000 pressure vessels manufactured — each hydrostatically tested to 1.5× working pressure before it leaves our facility.",
    stat: "5,000+",
    statLabel: "Vessels Delivered",
  },
  {
    src: "/images/gallery/02.webp",
    eyebrow: "MADE IN EGYPT · TRUSTED WORLDWIDE",
    titleFill: "Built to",
    titleOutline: "Last",
    body: "From our factory in Egypt, we supply certified industrial pressure vessels to buyers across three continents — since 2009.",
    stat: "3",
    statLabel: "Continents Served",
  },
  {
    src: "/images/gallery/03.jpg",
    eyebrow: "OUR FACILITY",
    titleFill: "Where Steel",
    titleOutline: "Meets Science",
    body: "State-of-the-art manufacturing lines producing custom pressure vessels from 50 L to 10,000 L — built for the harshest industrial demands.",
    stat: "12,000",
    statLabel: "m² Production Floor",
  },
  {
    src: "/images/gallery/04.webp",
    eyebrow: "CUSTOM ENGINEERING",
    titleFill: "Your Spec.",
    titleOutline: "Our Build.",
    body: "Every vessel is custom-engineered to your exact working pressure, volume, and material requirements. No standard. No compromise.",
    stat: "48 BAR",
    statLabel: "Max Working Pressure",
  },
  {
    src: "/images/gallery/05.jpg",
    eyebrow: "CE / ISO 16528 CERTIFIED",
    titleFill: "Certified.",
    titleOutline: "Trusted.",
    body: "CE/PED and ISO 16528 certified — our vessels meet the highest international standards and ship with full documentation included.",
    stat: "2009",
    statLabel: "Founded in Egypt",
  },
]

// ─── Dot ─────────────────────────────────────────────────────────────────────
function Dot({
  index,
  total,
  progress,
}: {
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start  = index / total
  const end    = (index + 1) / total
  const w      = end - start
  const active = useTransform(progress, [start, start + w * 0.2, end - w * 0.2, end], [0, 1, 1, 0])
  const width  = useTransform(active, [0, 1], ["4px", "24px"])
  const opacity = useTransform(active, [0, 1], [0.3, 1])
  return <motion.div className="h-[3px] rounded-full bg-white" style={{ width, opacity }} />
}

// ─── Slide ────────────────────────────────────────────────────────────────────
function Slide({
  slide,
  index,
  total,
  progress,
}: {
  slide: SlideData
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const [imgErr, setImgErr] = useState(false)
  const start = index / total
  const end   = (index + 1) / total
  const w     = end - start   // 0.2 for 5 slides

  // Image crossfade
  const imgOpacity = useTransform(
    progress,
    index === 0
      ? [0,                  end - w * 0.2,    end]
      : [start, start + w * 0.25, end - w * 0.2, end],
    index === 0 ? [1, 1, 0] : [0, 1, 1, 0],
  )

  // Subtle x-push on image entry
  const imgX = useTransform(
    progress,
    index === 0 ? [0, end] : [start, start + w * 0.5],
    index === 0 ? ["0%", "0%"] : ["3%", "0%"],
  )

  // Ken Burns
  const imgScale = useTransform(progress, [start, end], [1.08, 1.0])

  // Eyebrow + title line 1
  const topOpacity = useTransform(
    progress,
    index === 0
      ? [0,                  end - w * 0.2, end]
      : [start, start + w * 0.3, end - w * 0.2, end],
    index === 0 ? [1, 1, 0] : [0, 1, 1, 0],
  )
  const topY = useTransform(
    progress,
    index === 0
      ? [end - w * 0.25,     end]
      : [start, start + w * 0.3, end - w * 0.2, end],
    index === 0 ? [0, -28] : [38, 0, 0, -22],
  )

  // Title line 2 (slight stagger after line 1)
  const line2Opacity = useTransform(
    progress,
    index === 0
      ? [0, w * 0.1,              end - w * 0.2, end]
      : [start + w * 0.06, start + w * 0.36, end - w * 0.2, end],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0],
  )
  const line2Y = useTransform(
    progress,
    index === 0
      ? [end - w * 0.25,          end]
      : [start + w * 0.06, start + w * 0.36, end - w * 0.2, end],
    index === 0 ? [0, -28] : [52, 0, 0, -22],
  )

  // Bottom text + stat (enters after top, exits same time)
  const botOpacity = useTransform(
    progress,
    index === 0
      ? [0, w * 0.12,             end - w * 0.18, end]
      : [start + w * 0.12, start + w * 0.42, end - w * 0.18, end],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0],
  )
  const botY = useTransform(
    progress,
    index === 0
      ? [end - w * 0.25,          end]
      : [start + w * 0.12, start + w * 0.42, end - w * 0.18, end],
    index === 0 ? [0, 18] : [-18, 0, 0, 18],
  )

  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: imgOpacity }}>

      {/* Photo */}
      {!imgErr ? (
        <motion.div className="absolute inset-0" style={{ x: imgX, scale: imgScale }}>
          <Image
            src={slide.src}
            alt={`SEROP COMP — ${slide.eyebrow}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
            onError={() => setImgErr(true)}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#04080f] to-[#0a1a3a]" />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />

      {/* Left accent line */}
      <motion.div
        className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-[#315cff] via-[#00b8ff] to-transparent"
        style={{ height: "48%", opacity: topOpacity }}
      />

      {/* ── TOP LEFT — eyebrow + split title ── */}
      <div className="absolute left-10 top-16 z-10 md:left-16">

        <motion.p
          className="mb-5 font-mono text-[10px] uppercase tracking-[0.38em] text-white/45"
          style={{ opacity: topOpacity, y: topY }}
        >
          {slide.eyebrow}
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-display font-black leading-[0.88] tracking-tight text-white"
            style={{ fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)", opacity: topOpacity, y: topY }}
          >
            {slide.titleFill}
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            className="font-display font-black leading-[0.88] tracking-tight"
            style={{
              fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)",
              opacity: line2Opacity,
              y: line2Y,
              WebkitTextStroke: "1.5px rgba(255,255,255,0.45)",
              color: "transparent",
            }}
          >
            {slide.titleOutline}
          </motion.h2>
        </div>
      </div>

      {/* Slide counter — top right */}
      <motion.div
        className="absolute right-10 top-[4.5rem] z-10 text-right md:right-16"
        style={{ opacity: topOpacity }}
      >
        <span className="font-mono text-[11px] tracking-[0.2em] text-white/30">
          {num} <span className="text-white/15">/</span> {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      {/* ── BOTTOM — body text + stat ── */}
      <div className="absolute bottom-20 left-10 right-10 z-10 flex items-end justify-between gap-6 md:left-16 md:right-16">

        {/* Body paragraph */}
        <motion.p
          className="max-w-[520px] text-[0.875rem] leading-[1.75] text-white/60 md:text-[0.95rem]"
          style={{ opacity: botOpacity, y: botY }}
        >
          {slide.body}
        </motion.p>

        {/* Stat callout */}
        <motion.div
          className="shrink-0 border-l border-white/10 pl-6 text-right"
          style={{ opacity: botOpacity, y: botY }}
        >
          <div
            className="font-display font-black leading-none text-white"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)" }}
          >
            {slide.stat}
          </div>
          <div className="mt-[6px] font-mono text-[8px] uppercase tracking-[0.28em] text-white/35">
            {slide.statLabel}
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function BrandGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={ref} style={{ height: `${SLIDES.length * 70}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#04080f]">

        {SLIDES.map((s, i) => (
          <Slide key={i} slide={s} index={i} total={SLIDES.length} progress={scrollYProgress} />
        ))}

        {/* Wordmark */}
        <div className="absolute left-10 top-7 z-50 md:left-16">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.42em] text-white/20">
            SEROP COMP
          </span>
        </div>

        {/* Dot nav */}
        <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-[6px]">
          {SLIDES.map((_, i) => (
            <Dot key={i} index={i} total={SLIDES.length} progress={scrollYProgress} />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] bg-white/[0.05]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#315cff] via-[#00b8ff] to-[#18d4ff]"
            style={{ width: barWidth }}
          />
        </div>

        {/* Scroll hint */}
        <div className="absolute right-8 bottom-14 z-50 flex flex-col items-center gap-2 md:right-16">
          <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
          <span
            className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/20"
            style={{ writingMode: "vertical-rl" }}
          >
            scroll
          </span>
        </div>

      </div>
    </div>
  )
}
