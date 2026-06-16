"use client"

import { useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Award, Factory, Globe2, Headphones, ShieldCheck, Wrench } from "lucide-react"
import { SectionHeader } from "./section-header"
import { useI18n } from "@/components/i18n-provider"

const reasons = [
  { icon: Factory,    title: "manufacturing_title", desc: "manufacturing_desc", color: "#5c7cff" },
  { icon: ShieldCheck, title: "testing_title",      desc: "testing_desc",       color: "#00b8ff" },
  { icon: Wrench,     title: "custom_title",        desc: "custom_desc",        color: "#18d4ff" },
  { icon: Headphones, title: "support_title",       desc: "support_desc",       color: "#00e4ff" },
  { icon: Globe2,     title: "export_title",        desc: "export_desc",        color: "#6c8fff" },
  { icon: Award,      title: "warranty_title",      desc: "warranty_desc",      color: "#00c4ff" },
] as const

export function WhyChoose() {
  const { dict } = useI18n()

  return (
    <section className="relative overflow-hidden py-14 lg:py-32">
      {/* Subtle ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(49,92,255,0.06),transparent)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={dict.whyChoose.eyebrow}
          title={dict.whyChoose.title}
          description={dict.whyChoose.description}
        />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <TiltCard key={r.title} index={i} color={r.color}>
              {/* Number badge */}
              <div
                className="absolute right-6 top-5 font-mono text-[11px] font-bold tracking-[0.15em]"
                style={{ color: `${r.color}55` }}
              >
                0{i + 1}
              </div>

              {/* Icon */}
              <div
                className="mb-6 grid size-12 place-items-center rounded-xl border"
                style={{ borderColor: `${r.color}35`, background: `${r.color}14` }}
              >
                <r.icon className="size-6" style={{ color: r.color }} />
              </div>

              {/* Text */}
              <h3 className="font-display text-lg font-semibold text-foreground">
                {dict.whyChoose.reasons[r.title]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {dict.whyChoose.reasons[r.desc]}
              </p>

              {/* Bottom bar reveal on hover */}
              <div
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, ${r.color}80, ${r.color}20, transparent)` }}
              />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function TiltCard({
  children,
  index,
  color,
}: {
  children: React.ReactNode
  index: number
  color: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 340, damping: 26 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 340, damping: 26 })

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
      spotRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, ${color}1e, transparent 68%)`
      spotRef.current.style.opacity    = "1"
    }
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    if (spotRef.current) spotRef.current.style.opacity = "0"
  }

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" as const }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 dark:border-white/[0.07] dark:bg-[#0b1d35] dark:shadow-none cursor-default sm:p-6 lg:p-8"
      >
        {/* Top shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        {/* Cursor spotlight */}
        <div
          ref={spotRef}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {children}
      </motion.div>
    </div>
  )
}
