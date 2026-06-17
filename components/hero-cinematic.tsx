﻿"use client"

import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { BadgeCheck, Gauge, ShieldCheck } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { products } from "@/lib/products"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SEROP_LETTERS = "SEROP COMP".split("")
// Aspect ratio of the mascot video (1136 × 808)
const MASCOT_H = 165
const MASCOT_W = Math.round(MASCOT_H * (1136 / 808))

// Auto-built from products.ts — every vertical product appears here automatically
const TANKS = products
  .filter((p) => p.orientation === "vertical")
  .sort((a, b) => a.capacityL - b.capacityL)
  .map((p) => ({ src: p.image, label: p.capacity }))

const SCAN_DUR   = 2.2   // seconds â€" wipe travel time
const HOLD_DUR   = 3200  // ms â€" hold time between transitions
const INIT_DELAY = 5000  // ms â€" wait after page load before first wipe

// â"€â"€ Spec badge â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function SpecBadge({ icon: Icon, label, sub, delay, reduced }: {
  icon: React.ElementType; label: string; sub: string; delay: number; reduced: boolean
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduced ? {} : { delay, duration: 0.5, ease: EASE }}
      className="flex items-center gap-2.5 rounded-2xl border border-border/40 bg-background/80 px-4 py-2.5 shadow backdrop-blur dark:border-white/10 dark:bg-[#06111f]/85"
    >
      <div className="grid size-8 shrink-0 place-items-center rounded-xl border border-[#315cff]/35 bg-[#315cff]/10">
        <Icon className="size-4 text-[#315cff] dark:text-[#5c7cff]" />
      </div>
      <div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-foreground dark:text-white/75">{label}</div>
        <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground dark:text-white/35">{sub}</div>
      </div>
    </motion.div>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
export function HeroCinematic() {
  const { locale, dict } = useI18n()
  const prefersReduced   = useReducedMotion()
  const isAr = locale === "ar"

  // â"€â"€ Wipe-transition state â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
  const [step,     setStep]     = useState(0)
  const [isWiping, setIsWiping] = useState(false)
  const wipeTimerRef            = useRef<ReturnType<typeof setTimeout> | null>(null)

  // â"€â"€ Mascot letter-run state â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
  const [mascotRunning, setMascotRunning] = useState(false)
  const [activeLetter,  setActiveLetter]  = useState(-1)
  const mascotTimers    = useRef<ReturnType<typeof setTimeout>[]>([])
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const [mascotEndX, setMascotEndX] = useState(700)   // updated at runtime from container width

  useEffect(() => {
    if (prefersReduced) return
    const clearAll = () => { mascotTimers.current.forEach(clearTimeout); mascotTimers.current = [] }

    const runOnce = () => {
      clearAll()
      // Measure actual text width â†' stop mascot center at the last "P"
      const cw = titleContainerRef.current?.offsetWidth ?? 700
      setMascotEndX(cw - MASCOT_W / 2)
      setMascotRunning(true)
      const DUR = 7000 // slower run â€" 7 s
      SEROP_LETTERS.forEach((char, i) => {
        if (char === " ") return
        const t = (i / (SEROP_LETTERS.length - 1)) * DUR
        mascotTimers.current.push(
          setTimeout(() => setActiveLetter(i), t),
          setTimeout(() => setActiveLetter(-1), t + 400),
        )
      })
      mascotTimers.current.push(
        setTimeout(() => {
          setMascotRunning(false)
          mascotTimers.current.push(setTimeout(runOnce, 16000))
        }, DUR + 600),
      )
    }

    const init = setTimeout(runOnce, 5500)
    return () => { clearTimeout(init); clearAll() }
  }, [prefersReduced])

  const current = step % TANKS.length
  const next    = (step + 1) % TANKS.length

  // â"€â"€ Timer: when wipe completes, advance step, schedule next wipe â"€â"€â"€â"€â"€â"€â"€â"€â"€
  useEffect(() => {
    if (!isWiping || prefersReduced) return
    const t = setTimeout(() => {
      setStep(s => s + 1)
      setIsWiping(false)
    }, SCAN_DUR * 1000 + 60)  // +60ms safety margin
    return () => clearTimeout(t)
  }, [isWiping, prefersReduced])

  // â"€â"€ After each wipe completes (step changes), hold then wipe again â"€â"€â"€â"€â"€â"€â"€
  const prevStep = useRef(0)
  useEffect(() => {
    if (step === 0) return   // skip mount
    if (step === prevStep.current) return
    prevStep.current = step
    wipeTimerRef.current = setTimeout(() => setIsWiping(true), HOLD_DUR)
    return () => { if (wipeTimerRef.current) clearTimeout(wipeTimerRef.current) }
  }, [step])

  // â"€â"€ Initial delay before first wipe â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
  useEffect(() => {
    if (prefersReduced) return
    wipeTimerRef.current = setTimeout(() => setIsWiping(true), INIT_DELAY)
    return () => { if (wipeTimerRef.current) clearTimeout(wipeTimerRef.current) }
  }, [prefersReduced])

  return (
    <section
      id="hero-cinematic"
      className="relative isolate flex min-h-screen flex-col items-center overflow-hidden bg-[#eef9ff] dark:bg-[#06111f]"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* â"€â"€ Backgrounds â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <div className="pointer-events-none absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_65%,rgba(49,92,255,0.07),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(49,92,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(49,92,255,0.6)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#eef9ff] to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_72%,rgba(49,92,255,0.14),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.028] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#06111f] to-transparent" />
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col items-center px-6 pb-6 pt-24 text-center">

        {/* ── Header block — shrinks to its content, never grows ── */}
        <div className="shrink-0">

        {/* â"€â"€ Badge â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={prefersReduced ? {} : { delay: 0.5, duration: 0.7, ease: EASE }}
          className="mb-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#315cff]/20 bg-[#315cff]/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#315cff]/70 dark:border-white/10 dark:bg-white/[0.055] dark:text-white/50">
            <span className="size-1.5 animate-pulse rounded-full bg-[#315cff] dark:bg-[#00a7ff]" />
            {dict.hero.badge}
          </span>
        </motion.div>

        {/* â"€â"€ "WELCOME" â€" neon pulse â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={prefersReduced ? {} : { delay: 0.7, duration: 1.0, ease: EASE }}
          className="mb-3 flex items-center justify-center gap-5"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#315cff]/70 sm:w-20" />
          <motion.span
            className="font-display text-[clamp(1.5rem,3.2vw,2.8rem)] font-black uppercase leading-none tracking-[0.28em]"
            animate={prefersReduced ? {} : {
              opacity: [1, 0.18, 1, 0.22, 1, 0.15, 1],
              filter: [
                "drop-shadow(0 0 22px rgba(49,92,255,0.55))",
                "drop-shadow(0 0 4px rgba(49,92,255,0.15))",
                "drop-shadow(0 0 28px rgba(49,92,255,0.65))",
                "drop-shadow(0 0 4px rgba(49,92,255,0.10))",
                "drop-shadow(0 0 22px rgba(49,92,255,0.55))",
                "drop-shadow(0 0 4px rgba(49,92,255,0.12))",
                "drop-shadow(0 0 22px rgba(49,92,255,0.55))",
              ],
            }}
            transition={prefersReduced ? {} : {
              duration: 4.5, delay: 3, repeat: Infinity, repeatDelay: 3,
              ease: "easeInOut",
              times: [0, 0.12, 0.26, 0.38, 0.55, 0.7, 1],
            }}
            style={{
              background: "linear-gradient(90deg,#315cff 0%,#00b8ff 50%,#18d4ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcome
          </motion.span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#315cff]/70 sm:w-20" />
        </motion.div>

        {/* â"€â"€ Title â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 45, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={prefersReduced ? {} : { delay: 0.75, duration: 0.9, ease: EASE }}
        >
          <h1 className="font-display font-black tracking-tight">

            {/* â"€â"€ "SEROP COMP" â€" mascot runs in front of these letters â"€â"€ */}
            <div ref={titleContainerRef} className="relative inline-block" dir="ltr">
              <span className="block whitespace-nowrap text-[clamp(2rem,7.5vw,8.5rem)] leading-[0.93] text-foreground dark:text-white">
                {SEROP_LETTERS.map((char, i) => (
                  <motion.span
                    key={i}
                    style={{ display: "inline-block" }}
                    animate={activeLetter === i ? {
                      y: -16,
                      scale: 1.14,
                      filter: "drop-shadow(0 0 14px rgba(49,92,255,0.9)) drop-shadow(0 0 28px rgba(0,180,255,0.5))",
                    } : {
                      y: 0,
                      scale: 1,
                      filter: "drop-shadow(0 0 0px rgba(49,92,255,0))",
                    }}
                    transition={{ type: "spring", stiffness: 550, damping: 22 }}
                  >
                    {char === " " ? " " : char}
                  </motion.span>
                ))}
              </span>

              {/* Mascot runs in front of the letters */}
              <AnimatePresence>
                {mascotRunning && (
                  <motion.div
                    key="mascot-title-run"
                    className="pointer-events-none absolute"
                    style={{
                      bottom: "-4px",
                      width: MASCOT_W,
                      height: MASCOT_H,
                      zIndex: 2,
                    }}
                    initial={{ x: -(MASCOT_W + 20) }}
                    animate={{ x: mascotEndX }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 7, ease: "linear" }}
                  >
                    <video
                      autoPlay
                      muted
                      playsInline
                      loop
                      preload="none"
                      style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(1.45) contrast(1.05)" }}
                    >
                      <source src="/mascot/walk2.webm" type="video/webm" />
                    </video>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span dir="ltr" className="mt-1 block bg-gradient-to-r from-[#315cff] via-[#00b8ff] to-[#18d4ff] bg-clip-text text-[clamp(1.6rem,3.4vw,3.8rem)] leading-[1.2] text-transparent">
              {dict.hero.title2}
            </span>
          </h1>
        </motion.div>


        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            TANK CONTAINER â€" Wipe transition lives here
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        </div>{/* end header */}
        <div className="relative mt-2 w-full flex-1 min-h-[280px] max-w-[300px] sm:max-w-[420px] lg:max-w-[560px]">

          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 scale-75 rounded-full bg-[radial-gradient(circle,rgba(49,92,255,0.18),transparent_60%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(49,92,255,0.28),transparent_60%)]" />

          {/* â"€â"€ Layer A: incoming tank â€" revealed topâ†'down via clipPath â"€â"€ */}
          {/* clipPath inset(top right bottom left)
              inset(0 0 100% 0) = fully hidden (100% clipped from bottom)
              inset(0 0   0% 0) = fully visible                           */}
          <motion.div
            key={`incoming-${next}`}
            className="absolute inset-0"
            initial={false}
            animate={{
              clipPath: isWiping
                ? "inset(0% 0 0% 0 round 0px)"
                : "inset(0% 0 100% 0 round 0px)",
            }}
            transition={
              isWiping
                ? { duration: SCAN_DUR, ease: "linear" }
                : { duration: 0 }
            }
          >
            <Image
              src={TANKS[next].src}
              alt={`SEROP COMP ${TANKS[next].label}`}
              fill
              sizes="(max-width:640px) 320px,(max-width:1024px) 440px,560px"
              className="object-contain drop-shadow-[0_40px_80px_rgba(49,92,255,0.28)]"
              priority={next === 0}
            />
          </motion.div>

          {/* â"€â"€ Layer B: outgoing tank â€" wiped away topâ†'down via clipPath â"€â"€ */}
          {/* inset(0%   0 0 0) = fully visible (0% clipped from top)
              inset(100% 0 0 0) = fully hidden  (100% clipped from top)   */}
          <motion.div
            key={`outgoing-${current}`}
            className="absolute inset-0 z-10"
            initial={false}
            animate={{
              clipPath: isWiping
                ? "inset(100% 0 0% 0 round 0px)"
                : "inset(0% 0 0% 0 round 0px)",
            }}
            transition={
              isWiping
                ? { duration: SCAN_DUR, ease: "linear" }
                : { duration: 0 }
            }
          >
            <Image
              src={TANKS[current].src}
              alt={`SEROP COMP ${TANKS[current].label}`}
              fill
              sizes="(max-width:640px) 320px,(max-width:1024px) 440px,560px"
              className="object-contain drop-shadow-[0_40px_80px_rgba(49,92,255,0.28)]"
              priority={current === 0}
            />
          </motion.div>

          {/* â"€â"€ Wipe scan line + glow â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
          {isWiping && !prefersReduced && (
            <motion.div
              key={`wipe-${step}`}
              className="pointer-events-none absolute inset-x-[-12%] z-20"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: SCAN_DUR, ease: "linear" }}
            >
              {/* Wide glow halo above the line */}
              <div
                className="absolute inset-x-0 bottom-0 h-20"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 100% at 50% 100%,rgba(49,92,255,0.50) 0%,rgba(90,160,255,0.22) 55%,transparent 100%)",
                  filter: "blur(14px)",
                }}
              />
              {/* Crisp wipe edge line */}
              <div
                className="absolute inset-x-[4%] h-[2px]"
                style={{
                  background:
                    "linear-gradient(to right,transparent 0%,rgba(150,210,255,0.7) 8%,rgba(220,245,255,1) 30%,rgba(255,255,255,1) 50%,rgba(220,245,255,1) 70%,rgba(150,210,255,0.7) 92%,transparent 100%)",
                  boxShadow:
                    "0 0 12px 4px rgba(49,92,255,0.65), 0 0 28px 10px rgba(0,180,255,0.35)",
                }}
              />
              {/* Subtle glow below the line */}
              <div
                className="absolute inset-x-0 top-0 h-8"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 100% at 50% 0%,rgba(49,92,255,0.30) 0%,transparent 80%)",
                  filter: "blur(8px)",
                }}
              />
            </motion.div>
          )}

          {/* â"€â"€ Idle scan loop (when NOT wiping) â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
          {!isWiping && !prefersReduced && (
            <>
              <motion.div
                className="pointer-events-none absolute inset-x-[-6%] h-16 z-10"
                style={{
                  background:
                    "radial-gradient(ellipse 82% 55% at 50% 50%,rgba(49,92,255,0.38) 0%,rgba(90,150,255,0.18) 55%,transparent 100%)",
                  filter: "blur(10px)",
                }}
                animate={{ top: ["0%","6%","54%","101%","108%"], opacity: [0,0.85,0.85,0.85,0] }}
                transition={{
                  duration: 3.5, repeat: Infinity, repeatDelay: 1.5,
                  ease: "linear", times: [0,0.06,0.5,0.94,1],
                }}
              />
              <motion.div
                className="pointer-events-none absolute inset-x-[-4%] h-[2px] z-10"
                style={{
                  background:
                    "linear-gradient(to right,transparent 0%,rgba(100,170,255,0.85) 12%,rgba(220,240,255,0.75) 50%,rgba(100,170,255,0.85) 88%,transparent 100%)",
                  boxShadow: "0 0 8px 2px rgba(49,92,255,0.35)",
                  filter: "blur(0.5px)",
                }}
                animate={{ top: ["0%","6%","54%","101%","108%"], opacity: [0,1,1,1,0] }}
                transition={{
                  duration: 3.5, repeat: Infinity, repeatDelay: 1.5,
                  ease: "linear", times: [0,0.06,0.5,0.94,1],
                }}
              />
            </>
          )}

          {/* Tank label chip */}
          <motion.div
            key={`label-${current}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[#315cff]/25 bg-background/80 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[#315cff] shadow backdrop-blur dark:bg-[#06111f]/80 dark:text-[#5c7cff]"
          >
            {TANKS[current].label}
          </motion.div>

          {/* Spec badges */}
          <div className="absolute left-[calc(100%+1.5rem)] top-[22%] hidden lg:block">
            <SpecBadge icon={BadgeCheck}  label="CE / PED"  sub="EU Certified"      delay={1.4} reduced={!!prefersReduced} />
          </div>
          <div className="absolute right-[calc(100%+1.5rem)] top-[26%] hidden lg:block">
            <SpecBadge icon={ShieldCheck} label="ISO 16528" sub="International Std" delay={1.6} reduced={!!prefersReduced} />
          </div>
          <div className="absolute bottom-[34%] right-[calc(100%+1.5rem)] hidden lg:block">
            <SpecBadge icon={Gauge}       label="48 BAR"    sub="Working Pressure"  delay={1.8} reduced={!!prefersReduced} />
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReduced ? {} : { delay: 2.2, duration: 0.7, ease: EASE }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.26em] text-muted-foreground/60 dark:text-white/25">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-[#315cff]/40 to-transparent dark:from-white/22" />
      </motion.div>
    </section>
  )
}
