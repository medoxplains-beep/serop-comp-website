"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

// ── Sizes ────────────────────────────────────────────────────────────────────
const W         = 480   // container width (px)
const H         = 680   // container height (px)
const PEEK_SHOW = 210   // px visible from right edge when peeking (head + arm area)

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type St   = "hidden" | "peek" | "full"
type Anim = "idle" | "wave" | "bye"

const MSGS: Record<Anim, string | null> = {
  idle: null,
  wave: "مرحباً! 👋",
  bye:  "مع السلامة! 👋",
}

export function Mascot() {
  const [heroVisible, setHeroVisible] = useState(false)
  const [st,          setSt]          = useState<St>("hidden")
  const [anim,    setAnim]    = useState<Anim>("idle")
  const [bubble,  setBubble]  = useState<string | null>(null)
  const [errored, setErrored] = useState(false)

  const timer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clr = () => { if (timer.current) clearTimeout(timer.current) }

  // ── Show only when #hero-cinematic section is in viewport ────────────────
  useEffect(() => {
    const el = document.getElementById("hero-cinematic")
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // ── Mouse tracking (subtle 3-D tilt) ────────────────────────────────────
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(mx, { stiffness: 50, damping: 14 })
  const ry = useSpring(my, { stiffness: 50, damping: 14 })

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set(((window.innerHeight / 2 - e.clientY) / window.innerHeight) * 6)
      my.set(((e.clientX - window.innerWidth  / 2) / window.innerWidth)  * 8)
    }
    window.addEventListener("mousemove", fn, { passive: true })
    return () => window.removeEventListener("mousemove", fn)
  }, [mx, my])

  // ── Bubble helper ─────────────────────────────────────────────────────────
  const showBubble = (a: Anim) => {
    if (!MSGS[a]) return
    if (bTimer.current) clearTimeout(bTimer.current)
    setBubble(MSGS[a])
    bTimer.current = setTimeout(() => setBubble(null), 2600)
  }

  // ── Animation cycle: peek → full+wave → idle → bye → hidden → repeat ────
  const runCycle = useCallback(() => {
    clr()
    // 1. Peek head + arm from right edge
    setSt("peek")
    timer.current = setTimeout(() => {
      // 2. Slide in fully, wave
      setSt("full"); setAnim("wave"); showBubble("wave")
      timer.current = setTimeout(() => {
        // 3. Idle float
        setAnim("idle")
        timer.current = setTimeout(() => {
          // 4. Bye, slide back out
          setAnim("bye"); showBubble("bye")
          timer.current = setTimeout(() => {
            setAnim("idle"); setSt("hidden")
            timer.current = setTimeout(runCycle, 12000)
          }, 1800)
        }, 2200)
      }, 1800)
    }, 1400)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    timer.current = setTimeout(runCycle, 3500)
    return clr
  }, [runCycle])

  // ── Click: wave once then leave ───────────────────────────────────────────
  const handleClick = () => {
    clr()
    if (st !== "full") {
      setSt("full"); setAnim("wave"); showBubble("wave")
      timer.current = setTimeout(() => {
        setAnim("bye"); showBubble("bye")
        timer.current = setTimeout(() => {
          setAnim("idle"); setSt("hidden")
          timer.current = setTimeout(runCycle, 12000)
        }, 1600)
      }, 3000)
    } else {
      setAnim("bye"); showBubble("bye")
      timer.current = setTimeout(() => {
        setAnim("idle"); setSt("hidden")
        timer.current = setTimeout(runCycle, 12000)
      }, 1600)
    }
  }

  if (errored || !heroVisible) return null

  // x > 0 → slides RIGHT (off-screen). x = 0 → fully visible.
  const xVal = st === "hidden" ? W : st === "peek" ? W - PEEK_SHOW : 0

  // When peeking: slight counter-clockwise lean so head tilts INTO screen
  const peekRotate = st === "peek" ? -10 : 0

  return (
    <div
      className="pointer-events-none fixed z-[9999] select-none hidden lg:block"
      style={{ right: 0, top: "50%", transform: "translateY(-50%)", width: W, height: H }}
      aria-hidden="true"
    >
      <motion.div
        className="pointer-events-auto absolute inset-0 cursor-pointer"
        animate={{ x: xVal }}
        transition={{ type: "spring", stiffness: 75, damping: 18 }}
        onClick={handleClick}
      >
        {/* Speech bubble — appears to the LEFT of the character */}
        <AnimatePresence>
          {bubble && (
            <motion.div
              key={bubble}
              initial={{ opacity: 0, scale: 0.7, x: 10 }}
              animate={{ opacity: 1, scale: 1,   x: 0  }}
              exit={{   opacity: 0, scale: 0.8,  x: 8  }}
              transition={{ duration: 0.25, ease: EASE }}
              className="pointer-events-none absolute z-20 rounded-2xl rounded-br-sm bg-white px-4 py-2.5 font-bold text-[#1a2b4a] shadow-2xl"
              style={{
                right: W - 20,
                top: "22%",
                fontSize: 15,
                whiteSpace: "nowrap",
                filter: "drop-shadow(0 6px 14px rgba(49,92,255,0.28))",
              }}
            >
              {bubble}
              {/* Arrow pointing RIGHT (toward mascot) */}
              <span className="absolute -right-[11px] top-3.5 border-[7px] border-transparent border-l-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Body wrapper — peek tilt + wave/bye animations */}
        <motion.div
          style={{
            width: W, height: H,
            transformOrigin: "right center",
            rotateX: rx, rotateY: ry,
          }}
          animate={{
            rotate: anim === "wave" ? [peekRotate, -8,  9, -6,  8, -3, 0]
                  : anim === "bye"  ? [0,          -8, 10, -8, 10, -3, 0]
                  :                   peekRotate,
            y:     anim === "wave" ? [0, -12, -7, -10, -5, -2, 0]
                 : anim === "bye"  ? [0, -14, -9, -14, -9, -3, 0]
                 :                   0,
            scale: anim === "wave" ? 1.04 : 1,
          }}
          transition={{ duration: anim === "wave" || anim === "bye" ? 1.2 : 0.55 }}
        >
          {/* Idle float */}
          <motion.div
            style={{ width: W, height: H }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Ground shadow */}
            <motion.div
              className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
              animate={{ scaleX: [0.85, 1.12, 0.85], opacity: [0.2, 0.48, 0.2] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 140, height: 18,
                background: "radial-gradient(ellipse,rgba(49,92,255,0.5) 0%,transparent 70%)",
                filter: "blur(9px)",
              }}
            />

            {/* Mascot video — scaleX(-1) mirrors it so character faces LEFT (toward screen) */}
            <video
              src="/mascot/walk.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              width={W}
              height={H}
              className="relative z-10 h-full w-full object-contain"
              style={{ display: "block", transform: "scaleX(-1)", filter: "brightness(1.45) contrast(1.05)" }}
              onError={() => setErrored(true)}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
