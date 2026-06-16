"use client"

import { useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { CheckCircle2, Flame, Layers, ShieldCheck, Zap } from "lucide-react"
import { SectionHeader } from "./section-header"
import { useI18n } from "@/components/i18n-provider"

const points = [
  ["welding_title",   "welding_desc"],
  ["testing_title",   "testing_desc"],
  ["coating_title",   "coating_desc"],
  ["standards_title", "standards_desc"],
  ["docs_title",      "docs_desc"],
] as const

const floatingBadges = [
  { icon: Flame,      label: "Certified Welding", top: "12%",  left: "-8%",   delay: 0   },
  { icon: ShieldCheck, label: "PED Compliant",    top: "38%",  right: "-10%", delay: 0.8 },
  { icon: Layers,     label: "ISO 16528",          bottom: "22%", left: "-6%",  delay: 1.5 },
  { icon: Zap,        label: "100% Tested",        bottom: "10%", right: "-8%", delay: 2.2 },
]

export function Engineering() {
  const { dict } = useI18n()

  const imgRef   = useRef<HTMLDivElement>(null)
  const mouseX   = useMotionValue(0)
  const mouseY   = useMotionValue(0)
  const rotateX  = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]),  { stiffness: 260, damping: 28 })
  const rotateY  = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]),  { stiffness: 260, damping: 28 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imgRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <section id="engineering" className="relative overflow-hidden py-14 lg:py-32">
      <div className="absolute inset-0 bg-blueprint opacity-40" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none lg:h-64" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none lg:h-64" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">

        {/* â”€â”€ 3D Image panel â”€â”€ */}
        <div style={{ perspective: "1200px" }} className="relative">
          <motion.div
            ref={imgRef}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" as const }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="group relative aspect-[3/2] sm:aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/60 shadow-3d cursor-default"
          >
            <Image
              src="/images/tanks/vertical-2000-blue.png"
              alt="SEROP COMP pressure vessel welding"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Top edge shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>

          {/* Floating badges */}
          {floatingBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: badge.delay }}
              className="absolute z-10 hidden md:block animate-float"
              style={{
                top:    badge.top,
                left:   badge.left,
                right:  (badge as { right?: string }).right,
                bottom: (badge as { bottom?: string }).bottom,
                animationDelay: `${badge.delay}s`,
              }}
            >
              <div className="flex items-center gap-2 rounded-full border border-[#315cff]/30 bg-background/90 px-3 py-2 backdrop-blur shadow-lg shadow-[#315cff]/10 dark:bg-[#06111f]/85">
                <badge.icon className="size-3.5 text-[#5c7cff]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/70 dark:text-white/70">
                  {badge.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* â”€â”€ Text content â”€â”€ */}
        <div>
          <SectionHeader
            eyebrow={dict.engineering.eyebrow}
            title={dict.engineering.title}
            description={dict.engineering.description}
          />
          <ul className="mt-10 space-y-5">
            {points.map(([titleKey, descKey], i) => (
              <motion.li
                key={titleKey}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group flex gap-4"
              >
                <div className="mt-0.5 grid size-5 shrink-0 place-items-center">
                  <CheckCircle2 className="size-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {dict.engineering.points[titleKey]}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {dict.engineering.points[descKey]}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
