"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue } from "framer-motion"
import Image from "next/image"

// ── أضف صور الشركة هنا في /public/images/gallery/ ──────────────────────────
const SLIDES = [
  { src: "/images/gallery/01.jpg", bg: "from-[#04080f] via-[#071428] to-[#0a1a3a]" },
  { src: "/images/gallery/02.jpg", bg: "from-[#060d1e] via-[#0c1e3c] to-[#071530]" },
  { src: "/images/gallery/03.jpg", bg: "from-[#04111f] via-[#082840] to-[#0a1e38]" },
  { src: "/images/gallery/04.jpg", bg: "from-[#0b1426] via-[#112048] to-[#0d1c3e]" },
  { src: "/images/gallery/05.jpg", bg: "from-[#050e1d] via-[#0a1c36] to-[#081628]" },
]

// ── Progress dot ────────────────────────────────────────────────────────────
function Dot({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total
  const end   = (index + 1) / total
  const active = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0])
  const w = useTransform(active, [0, 1], ["4px", "20px"])
  return (
    <motion.div
      className="rounded-full bg-white/70 h-[4px] transition-all"
      style={{ width: w, opacity: useTransform(active, [0, 1], [0.3, 1]) }}
    />
  )
}

// ── Single slide ─────────────────────────────────────────────────────────────
function Slide({
  slide,
  index,
  total,
  progress,
}: {
  slide: typeof SLIDES[0]
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const [err, setErr] = useState(false)
  const start = index / total
  const end   = (index + 1) / total

  // Clip wipe — slide sweeps in from right (100%→0% on right edge)
  const clipRight = useTransform(
    progress,
    [start, Math.min(start + 0.16, end)],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"],
  )
  const clipPath = useMotionTemplate`inset(0 ${clipRight} 0 0 round 0px)`

  // Opacity: slide 0 fades out at end; others fade in + stay + fade out
  const opacity = useTransform(
    progress,
    index === 0 ? [0, end - 0.06, end] : [start, start + 0.04, end - 0.04, end],
    index === 0 ? [1, 1, 0]            : [0, 1, 1, 0],
  )

  // Ken Burns — slow zoom-out while active
  const scale = useTransform(progress, [start, end], [1.12, 1.0])

  // Text entrance
  const textY = useTransform(
    progress,
    index === 0 ? [0, end] : [start, start + 0.14],
    index === 0 ? [0, -30] : [50, 0],
  )
  const textOpacity = useTransform(
    progress,
    index === 0 ? [0, 0.05, end - 0.08, end] : [start, start + 0.14, end - 0.08, end],
    index === 0 ? [1, 1, 1, 0]                : [0, 1, 1, 0],
  )

  // Ghost number
  const numOpacity = useTransform(
    progress,
    [start, start + 0.12, end - 0.12, end],
    [0, 0.06, 0.06, 0],
  )

  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div className="absolute inset-0" style={{ clipPath, opacity, zIndex: index + 1 }}>

      {/* Gradient fallback */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`} />

      {/* Image with Ken Burns */}
      {!err && (
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image
            src={slide.src}
            alt={`SEROP COMP — ${num}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
            onError={() => setErr(true)}
          />
        </motion.div>
      )}

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t  from-black/70 via-black/10 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r  from-black/40 via-transparent to-transparent" />

      {/* Giant ghost number */}
      <motion.div
        className="pointer-events-none absolute right-[-2vw] top-1/2 -translate-y-1/2 select-none"
        style={{ opacity: numOpacity }}
      >
        <span
          className="font-mono font-black leading-none text-white"
          style={{ fontSize: "28vw" }}
        >
          {num}
        </span>
      </motion.div>

      {/* Slide counter — top right */}
      <motion.div
        className="absolute right-10 top-28 z-10 text-right"
        style={{ opacity: textOpacity }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {num} / {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Main text — bottom left */}
      <div className="absolute bottom-24 left-10 right-10 z-10 overflow-hidden">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
            SEROP COMP · Egypt
          </p>
          <h2
            className="font-display font-black leading-[0.92] tracking-tight text-white"
            style={{ fontSize: "clamp(2.6rem, 7vw, 8rem)" }}
          >
            THE VALUE<br />OF QUALITY
          </h2>
        </motion.div>
      </div>

      {/* Thin left accent line */}
      <motion.div
        className="absolute left-0 top-0 w-[3px] bg-gradient-to-b from-[#315cff] via-[#00b8ff] to-transparent"
        style={{ height: "40%", opacity: textOpacity }}
      />
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export function BrandGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })

  const progressWidth = useMotionTemplate`${useTransform(scrollYProgress, [0, 1], [0, 100])}%`

  return (
    <div ref={ref} style={{ height: `${SLIDES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#04080f]">

        {/* ── Slides ── */}
        {SLIDES.map((s, i) => (
          <Slide key={i} slide={s} index={i} total={SLIDES.length} progress={scrollYProgress} />
        ))}

        {/* ── SEROP COMP wordmark — top left ── */}
        <div className="absolute left-10 top-7 z-50">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-white/30">
            SEROP COMP
          </span>
        </div>

        {/* ── Dot progress — bottom center ── */}
        <div className="absolute bottom-9 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
          {SLIDES.map((_, i) => (
            <Dot key={i} index={i} total={SLIDES.length} progress={scrollYProgress} />
          ))}
        </div>

        {/* ── Thin progress bar — very bottom ── */}
        <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] bg-white/[0.07]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#315cff] via-[#00b8ff] to-[#18d4ff]"
            style={{ width: progressWidth }}
          />
        </div>

        {/* ── Scroll hint — right side ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute right-8 bottom-16 z-50 flex flex-col items-center gap-2"
        >
          <div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" />
          <span
            className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/30"
            style={{ writingMode: "vertical-rl" }}
          >
            scroll
          </span>
        </motion.div>

      </div>
    </div>
  )
}
