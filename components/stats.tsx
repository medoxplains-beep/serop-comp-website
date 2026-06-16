"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Activity, Clock, Gauge, Globe2 } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

const statsData = [
  { value: 17,    suffix: "+",    key: "years",     icon: Clock,    color: "#6c8fff" },
  { value: 12000, suffix: "+",    key: "vessels",   icon: Activity, color: "#00b8ff" },
  { value: 12,    suffix: "+",    key: "countries", icon: Globe2,   color: "#18d4ff" },
  { value: 48,    suffix: " Bar", key: "pressure",  icon: Gauge,    color: "#00e4ff" },
] as const

export function Stats() {
  const { dict } = useI18n()

  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-card/30 py-10 lg:py-24">
      {/* Subtle ambient gradients — visible in both light and dark */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(49,92,255,0.07),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(49,92,255,0.15),transparent_60%)]" />
      {/* Fine grid (dark mode only) */}
      <div className="pointer-events-none absolute inset-0 hidden opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:44px_44px] dark:block" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {statsData.map((s, i) => (
            <Counter3D
              key={s.key}
              value={s.value}
              suffix={s.suffix}
              label={dict.stats[s.key]}
              delay={i * 0.12}
              icon={s.icon}
              color={s.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Counter3D({
  value,
  suffix,
  label,
  delay,
  icon: Icon,
  color,
}: {
  value: number
  suffix: string
  label: string
  delay: number
  icon: React.ElementType
  color: string
}) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)
  const spotRef   = useRef<HTMLDivElement>(null)
  const [count,   setCount]   = useState(0)
  const [started, setStarted] = useState(false)

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [11, -11]), { stiffness: 380, damping: 28 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-11, 11]), { stiffness: 380, damping: 28 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          const duration  = 1600
          const startTime = performance.now() + delay * 1000
          const tick = (now: number) => {
            const elapsed = now - startTime
            if (elapsed < 0) { requestAnimationFrame(tick); return }
            const p     = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - p, 4)
            setCount(Math.floor(eased * value))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, delay, started])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width  - 0.5
    const ny = (e.clientY - rect.top)  / rect.height - 0.5
    mouseX.set(nx)
    mouseY.set(ny)
    if (spotRef.current) {
      const px = (nx + 0.5) * 100
      const py = (ny + 0.5) * 100
      spotRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, ${color}22, transparent 68%)`
      spotRef.current.style.opacity    = "1"
    }
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    if (spotRef.current) spotRef.current.style.opacity = "0"
  }

  return (
    <div ref={wrapRef} style={{ perspective: "900px" }}>
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" as const }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
        /* Light mode: white card with subtle shadow. Dark mode: deep navy with glow */
        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-6 shadow-md transition-shadow hover:shadow-xl lg:p-8 cursor-default dark:border-white/[0.06] dark:bg-[#0b1d35] dark:shadow-none"
      >
        {/* Top edge shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/18" />

        {/* Cursor spotlight */}
        <div
          ref={spotRef}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Corner ambient glow (dark mode) */}
        <div
          className="absolute -right-6 -top-6 size-28 rounded-full blur-3xl opacity-0 dark:opacity-20"
          style={{ background: color }}
        />

        {/* Icon */}
        <div
          className="mb-5 grid size-11 place-items-center rounded-xl border"
          style={{ borderColor: `${color}35`, background: `${color}14` }}
        >
          <Icon className="size-5" style={{ color }} />
        </div>

        {/* Count */}
        <div
          className="font-display text-4xl font-black leading-none text-foreground lg:text-5xl dark:text-white"
          style={{ textShadow: `0 0 30px ${color}00` }}
        >
          <span className="dark:[text-shadow:0_0_30px_var(--glow)]" style={{ "--glow": `${color}55` } as React.CSSProperties}>
            {count.toLocaleString()}
          </span>
          <span style={{ color }}>{suffix}</span>
        </div>

        {/* Label */}
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </div>

        {/* Bottom accent bar */}
        <div
          className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        />
      </motion.div>
    </div>
  )
}
