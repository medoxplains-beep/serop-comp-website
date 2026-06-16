"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useI18n } from "@/components/i18n-provider"

const clients = [
  { name: "Air Technology", logo: "/images/clients/air-technology.webp" },
  { name: "Elnagar", logo: "/images/clients/elnagar.webp" },
  { name: "Elsewedy Electric", logo: "/images/clients/elsewedy-electric.webp" },
  { name: "EGIC", logo: "/images/clients/egic.webp" },
  { name: "HelioPower", logo: "/images/clients/heliopower.webp" },
  { name: "Delmar Industrial Group", logo: "/images/clients/delmar-industrial-group.webp" },
  { name: "Kabbani Furniture", logo: "/images/clients/kabbani-furniture.webp" },
  { name: "Heliatek", logo: "/images/clients/heliatek.webp" },
  { name: "Arab Organization for Industrialization", logo: "/images/clients/arab-organization-industrialization.webp" },
  { name: "Arma Group", logo: "/images/clients/arma-group.webp" },
  { name: "MTR Misr Tech Air", logo: "/images/clients/mtr-misr-tech-air.webp" },
  { name: "Shotmed", logo: "/images/clients/shotmed.webp" },
  { name: "Almonairy Corn Products", logo: "/images/clients/almonairy-corn-products.webp" },
  { name: "DSCO", logo: "/images/clients/dsco.webp" },
  { name: "Oleo Misr", logo: "/images/clients/oleo-misr.webp" },
  { name: "Suez Canal Authority", logo: "/images/clients/suez-canal-authority.webp" },
  { name: "Eldrieny", logo: "/images/clients/eldrieny.webp" },
  { name: "GEC", logo: "/images/clients/gec.webp" },
  { name: "Air Tech", logo: "/images/clients/air-tech.webp" },
]

export function Clients() {
  const { locale, dict } = useI18n()
  const isAr = locale === "ar"

  return (
    <section className="relative overflow-hidden border-y border-border/70 bg-blueprint-fine py-16 text-foreground dark:border-[#315cff]/15 dark:bg-[#06111f] dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(0,167,255,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.42),rgba(203,234,249,0.35))] dark:bg-[radial-gradient(circle_at_50%_15%,rgba(0,167,255,0.14),transparent_34%),linear-gradient(180deg,#06111f,#06111f)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(32,54,107,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(32,54,107,.06)_1px,transparent_1px)] [background-size:54px_54px] dark:[background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)]" />
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`relative mb-8 flex items-center justify-center gap-3 text-center text-sm font-semibold text-[#20366b] dark:text-[#bcd7ff] ${
            isAr ? "" : "font-mono uppercase tracking-[0.25em]"
          }`}
          dir={isAr ? "rtl" : "ltr"}
        >
          <span className="h-px w-10 bg-[#00a7ff]/40" />
          {dict.clients.label}
          <span className="h-px w-10 bg-[#00a7ff]/40" />
        </div>
        <div className="relative overflow-hidden py-3" dir="ltr">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#eaf7ff] to-transparent dark:from-[#06111f]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#eaf7ff] to-transparent dark:from-[#06111f]" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 44, ease: "linear", repeat: Infinity }}
            className="flex w-max gap-4 will-change-transform"
          >
            {[...clients, ...clients].map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="grid h-24 w-44 shrink-0 place-items-center rounded-xl border border-[#00a7ff]/18 bg-white px-4 py-3 shadow-lg shadow-black/18 transition hover:-translate-y-1 hover:border-[#00a7ff]/55 hover:shadow-[#00a7ff]/10"
              >
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={160}
                  height={90}
                  className="max-h-16 w-auto max-w-[9rem] object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

