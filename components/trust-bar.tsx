"use client"

import { motion } from "framer-motion"
import { ShieldCheck, BadgeCheck, Gauge, Award, Globe2 } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

const items = [
  { icon: BadgeCheck, key: "ce",       color: "#5c7cff" },
  { icon: ShieldCheck, key: "iso",     color: "#00b8ff" },
  { icon: Gauge,       key: "pressure", color: "#18d4ff" },
  { icon: Award,       key: "warranty", color: "#00e4ff" },
  { icon: Globe2,      key: "export",   color: "#6c8fff" },
] as const

export function TrustBar() {
  const { dict } = useI18n()

  return (
    <section className="relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-7">
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {items.map((item, i) => (
            <motion.li
              key={item.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex items-center gap-3"
            >
              {/* Icon with glow */}
              <div
                className="relative grid size-10 shrink-0 place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                style={{
                  borderColor: `${item.color}30`,
                  background:  `${item.color}12`,
                  boxShadow:   `0 0 0 0 ${item.color}00`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${item.color}35`
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${item.color}00`
                }}
              >
                <item.icon className="size-5 transition-colors" style={{ color: item.color }} />
              </div>
              <span className="text-sm font-medium leading-tight text-foreground/80 transition-colors group-hover:text-foreground">
                {dict.trustBar[item.key]}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
