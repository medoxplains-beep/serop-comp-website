import type { Variants, Transition } from "framer-motion"

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1]

export const VP = { once: true, margin: "-80px" }

export function tx(delay = 0, duration = 0.75): Transition {
  return { duration, delay, ease: EASE }
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 44, filter: "blur(8px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)" },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -32 },
  show:   { opacity: 1, y: 0 },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -44 },
  show:   { opacity: 1, x: 0 },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 44 },
  show:   { opacity: 1, x: 0 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.86, filter: "blur(6px)" },
  show:   { opacity: 1, scale: 1,    filter: "blur(0px)" },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show:   { opacity: 1, y: 0 },
}

/** Stagger container — pass custom stagger value */
export function staggerContainer(stagger = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  }
}

/** Draw a line from scaleX 0 → 1 */
export const drawLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show:   { scaleX: 1, opacity: 1 },
}

/** Page-level fade + slide for route transitions */
export const pageFade: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0 },
  exit:   { opacity: 0, y: -8 },
}
