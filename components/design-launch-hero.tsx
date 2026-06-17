"use client"

import { type ComponentType, type SVGProps, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  DraftingCompass,
  FileCheck2,
  Globe2,
  ShieldCheck,
} from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

type DesignSlide = {
  src: string
  alt: string
  focus: string
}

type SocialLink = {
  label: string
  href: string
  color: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

const DESIGN_SLIDES: DesignSlide[] = [
  {
    src: "/images/designs/engineering-design-01.png",
    alt: "SEROP COMP red horizontal receiver export concept",
    focus: "center 50%",
  },
  {
    src: "/images/designs/engineering-design-02.png",
    alt: "SEROP COMP factory engineering concept",
    focus: "center 54%",
  },
  {
    src: "/images/designs/engineering-design-03.png",
    alt: "SEROP COMP workshop quality inspection concept",
    focus: "center 50%",
  },
]

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/seropcomp?locale=ar_AR",
    color: "#1877f2",
    Icon: FacebookIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/serop-comp/posts/?feedView=all",
    color: "#0a66c2",
    Icon: LinkedinIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SeropCompCompany",
    color: "#ff0033",
    Icon: YoutubeIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/201151988818",
    color: "#22c55e",
    Icon: WhatsappIcon,
  },
]

export function DesignLaunchHero() {
  const { locale, dict } = useI18n()
  const [active, setActive] = useState(0)
  const isAr = locale === "ar"
  const slide = DESIGN_SLIDES[active]
  const progress = ((active + 1) / DESIGN_SLIDES.length) * 100

  const copy = useMemo(
    () =>
      isAr
        ? {
            titleTop: "هندسة SEROP COMP",
            titleAccent: "ثقة تُبنى من أول نظرة",
            body:
              "من التصميم الهندسي إلى الاختبار والتسليم، نصنع خزانات ضغط وهواء مضغوط تحمل اعتمادا أوروبيا، جودة موثقة، وحضورا يليق بالمشروعات الصناعية داخل مصر وخارجها.",
            cta: dict.cta.primary,
            secondary: "تواصل مع الهندسة",
            proof: "كل تفصيلة في التصميم تقود العميل إلى قرار أوضح",
            scroll: "اكمل التصفح",
            stats: [
              { value: "2009", label: "سنة التأسيس", Icon: CalendarDays },
              { value: "CE", label: "شهادات أوروبية", Icon: Award },
              { value: "Global", label: "تصدير لكل العالم", Icon: Globe2 },
            ],
            steps: [
              ["اعتماد يطمئن العميل", "CE / PED و ISO 16528 لدعم قرار الشراء من أول لحظة."],
              ["هندسة قبل التصنيع", "مراجعة السعة، الضغط، نقاط التوصيل، والتشطيب قبل التنفيذ."],
              ["حضور عالمي", "تجهيز فني وتوثيق مناسب للتوريد المحلي والتصدير."],
            ],
          }
        : {
            titleTop: "SEROP COMP Engineering",
            titleAccent: "Trust at first sight",
            body:
              "From engineering design to testing and delivery, we build compressed-air tanks and pressure vessels with European certification, documented quality, and a presence made for industrial buyers worldwide.",
            cta: dict.cta.primary,
            secondary: "Contact engineering",
            proof: "Every visual detail moves the client toward a clearer decision",
            scroll: "Keep scrolling",
            stats: [
              { value: "2009", label: "Established", Icon: CalendarDays },
              { value: "CE", label: "European certificates", Icon: Award },
              { value: "Global", label: "Worldwide export", Icon: Globe2 },
            ],
            steps: [
              ["Certified confidence", "CE / PED and ISO 16528 support buyer trust from the first view."],
              ["Engineering before build", "Capacity, pressure, ports, finish, and layout are reviewed before production."],
              ["Global-ready presence", "Technical files and documentation prepared for local supply and export."],
            ],
          },
    [dict.cta.primary, isAr],
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % DESIGN_SLIDES.length)
    }, 5600)
    return () => window.clearInterval(timer)
  }, [])

  const go = (direction: number) => {
    setActive((index) => (index + direction + DESIGN_SLIDES.length) % DESIGN_SLIDES.length)
  }

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#eaf7ff] text-[#111b2a] dark:bg-[#04111f] dark:text-white"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(32,54,107,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(32,54,107,.06)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_22%,rgba(0,167,255,.24),transparent_48%),linear-gradient(180deg,rgba(255,255,255,.94),rgba(207,241,255,.74)_58%,rgba(235,249,255,.96))] dark:bg-[radial-gradient(ellipse_at_50%_22%,rgba(0,167,255,.18),transparent_48%),linear-gradient(180deg,rgba(4,17,31,.96),rgba(7,30,52,.98)_58%,rgba(4,17,31,.99))]" />

      <div className="relative flex min-h-[100svh] flex-col pt-20">
        <div className="relative h-[52svh] min-h-[390px] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, scale: 1.06, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.01, y: -22 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-4 bottom-4 top-5 overflow-hidden rounded-[30px] border border-white/65 bg-[#07111f] shadow-2xl shadow-[#315cff]/14 dark:border-white/10"
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.015 }}
                animate={{ scale: 1.085 }}
                transition={{ duration: 6.4, ease: "easeOut" }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover"
                  style={{ objectPosition: slide.focus }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/72 via-[#06111f]/10 to-[#06111f]/8" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/42 via-transparent to-[#06111f]/42" />
              <div className="absolute inset-x-[16%] bottom-8 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#00a7ff]/90 to-transparent blur-[1px]" />
              <motion.div
                className="absolute inset-x-[10%] bottom-8 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent"
                animate={{ opacity: [0.25, 0.9, 0.25], scaleX: [0.86, 1, 0.86] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/60 bg-white/72 px-3 py-2 shadow-xl shadow-[#315cff]/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#06111f]/68">
            <button
              onClick={() => go(isAr ? 1 : -1)}
              className="grid size-9 place-items-center rounded-full border border-border/70 bg-white/70 text-[#315cff] transition hover:bg-[#315cff] hover:text-white dark:border-white/10 dark:bg-white/8 dark:text-white"
              aria-label="Previous design"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-2">
              {DESIGN_SLIDES.map((item, index) => (
                <button
                  key={item.src}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${index === active ? "w-10 bg-[#315cff]" : "w-2 bg-[#315cff]/24 dark:bg-white/24"}`}
                  aria-label={`Show visual ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(isAr ? -1 : 1)}
              className="grid size-9 place-items-center rounded-full border border-border/70 bg-white/70 text-[#315cff] transition hover:bg-[#315cff] hover:text-white dark:border-white/10 dark:bg-white/8 dark:text-white"
              aria-label="Next design"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#315cff] via-[#00a7ff] to-[#18d4ff] transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>

        <div className="relative flex flex-1 items-center border-t border-[#c6e4f3]/70 bg-white/28 px-6 py-5 backdrop-blur-sm dark:border-white/10 dark:bg-black/12">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 lg:grid-cols-[1.04fr_.96fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="max-w-4xl font-display text-4xl font-black leading-[0.96] tracking-tight text-[#111b2a] dark:text-white sm:text-5xl">
                <span className="block">{copy.titleTop}</span>
                <span className="mt-1 block bg-gradient-to-r from-[#315cff] via-[#008dff] to-[#18d4ff] bg-clip-text text-transparent">
                  {copy.titleAccent}
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] font-medium leading-7 text-[#526173] dark:text-white/64">
                {copy.body}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/request-quote"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#315cff] to-[#00a7ff] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#315cff]/20 transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  {copy.cta}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-[#315cff]/25 bg-white/52 px-7 py-3.5 text-sm font-bold text-[#111b2a] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#315cff]/60 hover:bg-white/76 dark:border-white/12 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
                >
                  {copy.secondary}
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map(({ label, href, color, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="group grid size-11 place-items-center rounded-full border border-[#c6e4f3]/80 bg-white/62 text-[#315cff] shadow-lg shadow-[#315cff]/8 backdrop-blur transition hover:-translate-y-1 hover:border-white hover:bg-white dark:border-white/10 dark:bg-white/8 dark:text-white"
                  >
                    <Icon className="size-5 transition group-hover:scale-110" style={{ color }} />
                  </a>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-3">
                {copy.stats.map(({ value, label, Icon }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-[#c6e4f3]/75 bg-white/58 p-4 shadow-lg shadow-[#315cff]/8 backdrop-blur transition hover:-translate-y-1 hover:border-[#315cff]/35 dark:border-white/10 dark:bg-white/8"
                  >
                    <div className="mb-3 grid size-9 place-items-center rounded-xl bg-[#315cff]/10 text-[#315cff] dark:bg-white/8 dark:text-[#8eb8ff]">
                      <Icon className="size-4" />
                    </div>
                    <div className="font-display text-3xl font-black leading-none text-[#315cff] dark:text-[#8eb8ff]">{value}</div>
                    <div className="mt-2 text-xs font-bold leading-5 text-[#526173] dark:text-white/58">{label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-[#c6e4f3]/75 bg-white/58 p-4 shadow-xl shadow-[#315cff]/8 backdrop-blur dark:border-white/10 dark:bg-white/8"
              >
                <div className="mb-4 flex items-center gap-3 text-base font-black">
                  <CheckCircle2 className="size-5 text-[#00a7ff]" />
                  {copy.proof}
                </div>
                <div className="grid gap-3 lg:grid-cols-3">
                  {copy.steps.map(([title, body], index) => {
                    const Icon = [ShieldCheck, DraftingCompass, FileCheck2][index] ?? BadgeCheck
                    return (
                      <div key={title} className="rounded-2xl border border-[#c6e4f3]/55 bg-white/46 p-3 transition hover:border-[#315cff]/35 dark:border-white/10 dark:bg-black/12">
                        <div className="mb-2 grid size-9 place-items-center rounded-xl bg-[#315cff]/10 text-[#315cff] dark:bg-white/8 dark:text-[#8eb8ff]">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <div className="font-bold">{title}</div>
                          <div className="mt-1 text-xs leading-5 text-[#526173] dark:text-white/56">{body}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          <a
            href="#hero-cinematic"
            className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full border border-[#315cff]/18 bg-white/60 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#315cff] shadow-lg shadow-[#315cff]/8 backdrop-blur transition hover:bg-white/85 dark:border-white/10 dark:bg-white/8 dark:text-[#8eb8ff] md:inline-flex"
          >
            {copy.scroll}
          </a>
        </div>
      </div>
    </section>
  )
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M14.45 8.36V6.95c0-.67.45-.83.76-.83h1.94V3.15L14.48 3.14c-2.96 0-3.63 2.21-3.63 3.63v1.59H9.14v3.06h1.71v8.44h3.6v-8.44h2.42l.32-3.06h-2.74Z" />
    </svg>
  )
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M6.94 8.98H3.72v10.31h3.22V8.98ZM5.33 4A1.87 1.87 0 1 0 5.3 7.74 1.87 1.87 0 0 0 5.33 4Zm13.95 9.38c0-3.11-1.66-4.56-3.88-4.56-1.79 0-2.59.98-3.04 1.67V8.98H9.28c.04.97 0 10.31 0 10.31h3.21v-5.76c0-.31.02-.62.11-.84.23-.62.76-1.26 1.65-1.26 1.17 0 1.64.89 1.64 2.19v5.67h3.21v-5.91h.18Z" />
    </svg>
  )
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M21.58 7.19a2.62 2.62 0 0 0-1.84-1.85C18.12 4.9 11.6 4.9 11.6 4.9s-6.52 0-8.14.44a2.62 2.62 0 0 0-1.84 1.85A27.1 27.1 0 0 0 1.18 12a27.1 27.1 0 0 0 .44 4.81 2.62 2.62 0 0 0 1.84 1.85c1.62.44 8.14.44 8.14.44s6.52 0 8.14-.44a2.62 2.62 0 0 0 1.84-1.85A27.1 27.1 0 0 0 22.02 12a27.1 27.1 0 0 0-.44-4.81ZM9.47 15.04V8.96L14.93 12l-5.46 3.04Z" />
    </svg>
  )
}

function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M20.52 3.49A11.8 11.8 0 0 0 1.96 17.7L.7 22.32l4.73-1.24a11.77 11.77 0 0 0 5.64 1.44h.01A11.81 11.81 0 0 0 20.52 3.49Zm-9.44 17.03h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-2.8.73.75-2.73-.23-.38A9.82 9.82 0 1 1 11.08 20.52Zm5.38-7.35c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.2.29-.77.96-.94 1.16-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.64-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.09 3.19 5.07 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.88.12.57-.09 1.74-.71 1.98-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.56-.35Z" />
    </svg>
  )
}
