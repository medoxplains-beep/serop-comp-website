"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { ExternalLink, FileBadge } from "lucide-react"
import { SectionHeader } from "./section-header"
import { useI18n } from "@/components/i18n-provider"

const certs = [
  { name: "ce_name",        issuer: "ce_issuer",        code: "ce_code",        image: "/images/certificates/pcms-ce-compliance.webp" },
  { name: "iso16528_name",  issuer: "iso16528_issuer",  code: "iso16528_code",  image: "/images/certificates/uks-iso-16528.webp" },
  { name: "ped_name",       issuer: "ped_issuer",       code: "ped_code",       image: "/images/certificates/certifica-ce-ped.webp" },
  { name: "iso9001_name",   issuer: "iso9001_issuer",   code: "iso9001_code",   image: "/images/certificates/first-plus-iso-9001.webp" },
  { name: "intercert_name", issuer: "intercert_issuer", code: "intercert_code", image: "/images/certificates/intercert-iso-16528.webp" },
] as const

export function Certifications() {
  const { dict } = useI18n()
  const [showMascot, setShowMascot] = useState(false)

  // appear 7s → hide → wait 18s → repeat
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>
    const cycle = () => {
      setShowMascot(true)
      t2 = setTimeout(() => {
        setShowMascot(false)
        t1 = setTimeout(cycle, 18000)
      }, 7000)
    }
    t1 = setTimeout(cycle, 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section id="certifications" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header row — text on one side, mascot on the other */}
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <SectionHeader
              eyebrow={dict.certifications.eyebrow}
              title={dict.certifications.title}
              description={dict.certifications.description}
            />
          </div>

          {/* Mascot video — above the certificate cards */}
          <div className="pointer-events-none hidden flex-shrink-0 lg:block">
            <AnimatePresence>
              {showMascot && (
                <motion.div
                  initial={{ x: 120, opacity: 0 }}
                  animate={{ x: 0,   opacity: 1 }}
                  exit={{   x: 120, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 60, damping: 18 }}
                >
                  <video
                    src="/mascot/certificates.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="w-[22rem] xl:w-[26rem]"
                    style={{ filter: "brightness(1.45) contrast(1.05)" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {certs.map((c, i) => (
            <CertCard key={`${c.name}-${c.issuer}`} cert={c} index={i} dict={dict.certifications} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({
  cert,
  index,
  dict,
}: {
  cert: typeof certs[number]
  index: number
  dict: { items: Record<string, string>; view: string }
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]),  { stiffness: 320, damping: 26 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]),  { stiffness: 320, damping: 26 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width  - 0.5
    const ny = (e.clientY - rect.top)  / rect.height - 0.5
    mouseX.set(nx)
    mouseY.set(ny)
    if (spotRef.current) {
      const px = (nx + 0.5) * 100
      const py = (ny + 0.5) * 100
      spotRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(49,92,255,0.18), transparent 65%)`
      spotRef.current.style.opacity    = "1"
    }
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    if (spotRef.current) spotRef.current.style.opacity = "0"
  }

  return (
    <div style={{ perspective: "900px" }}>
      <motion.a
        ref={cardRef}
        href={cert.image}
        target="_blank"
        rel="noreferrer"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" as const }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="group relative block overflow-hidden rounded-2xl border border-white/55 bg-white/48 text-left shadow-sm backdrop-blur transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#315cff]/14 dark:border-white/08 dark:bg-white/[0.04]"
      >
        {/* Top shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-10" />

        {/* Cursor spotlight */}
        <div
          ref={spotRef}
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Certificate image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-white">
          <Image
            src={cert.image}
            alt={dict.items[cert.name]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-contain object-top p-2 transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Image overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* External link icon */}
          <div className="absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-full bg-white/85 text-primary shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-110">
            <ExternalLink className="size-3.5" />
          </div>
        </div>

        {/* Card info */}
        <div className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <FileBadge className="size-4 text-primary" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {dict.view}
            </span>
          </div>
          <h3 className="font-display text-base font-bold leading-snug text-foreground">
            {dict.items[cert.name]}
          </h3>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {dict.items[cert.issuer]}
          </p>
          <div className="mt-4 border-t border-border/60 pt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {dict.items[cert.code]}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.a>
    </div>
  )
}
