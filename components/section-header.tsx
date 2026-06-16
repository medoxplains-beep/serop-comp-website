"use client"

import { motion, useReducedMotion } from "framer-motion"
import { fadeUp, drawLine, staggerContainer, tx, VP } from "@/lib/motion"

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?:     string
  title:        string
  description?: string
  align?:       "left" | "center"
}) {
  const reduced = useReducedMotion()
  const centered = align === "center"

  return (
    <motion.div
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
      variants={reduced ? undefined : staggerContainer(0.13, 0)}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={VP}
    >
      {eyebrow && (
        <motion.div
          className="mb-5 inline-flex items-center gap-2.5"
          variants={reduced ? undefined : fadeUp}
          transition={tx(0)}
        >
          <span className="eyebrow-badge">{eyebrow}</span>
        </motion.div>
      )}

      <motion.h2
        className="font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl text-foreground"
        variants={reduced ? undefined : fadeUp}
        transition={tx(eyebrow ? 0.1 : 0, 0.8)}
      >
        {title}
      </motion.h2>

      {/* Animated underline */}
      <motion.span
        className="underline-draw mt-3 mb-1"
        style={{ width: centered ? "4rem" : "3rem" }}
        variants={reduced ? undefined : drawLine}
        transition={{ duration: 0.7, delay: eyebrow ? 0.25 : 0.15, ease: [0.16, 1, 0.3, 1] }}
      />

      {description && (
        <motion.p
          className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
          variants={reduced ? undefined : fadeUp}
          transition={tx(eyebrow ? 0.28 : 0.18)}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
