"use client"

import Link from "next/link"
import Image from "next/image"
import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useI18n } from "@/components/i18n-provider"
import { fadeLeft, fadeUp, fadeRight, staggerContainer, tx, VP } from "@/lib/motion"

const contact = {
  email:        "info@seropcomp.com",
  phoneDisplay: "01151988818",
  phoneHref:    "+201151988818",
  whatsApp:     "https://wa.me/201151988818",
  addressEn:    "Plot No.116, Industrial zone A4, 10th of Ramadan city, Al-Sharqiyah, Egypt",
  addressAr:    "قطعة رقم 116، المنطقة الصناعية A4، مدينة العاشر من رمضان، الشرقية، مصر",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=A4%20Pieces%20No.116%2C%2010th%20of%20Ramadan%20City%201%2C%20Al-Sharqia%20Governorate%207068322%2C%20Egypt",
  website: "https://www.seropcomp.com",
}

const CERTS = ["CE / PED", "ISO 16528", "ISO 9001"]

export function Footer() {
  const { locale, dict } = useI18n()
  const isAr = locale === "ar"
  const reduced = useReducedMotion()

  const products = [
    dict.footer.products.vertical,
    dict.footer.products.horizontal,
    dict.footer.products.galvanized,
    dict.footer.products.painted,
    dict.footer.products.custom,
  ]

  return (
    <footer id="contact" className="relative overflow-hidden" dir={isAr ? "rtl" : "ltr"}>

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-white dark:bg-[#06111f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(49,92,255,0.06),transparent_58%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(49,92,255,0.14),transparent_58%)]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[500px] rounded-full bg-[#315cff]/[0.03] blur-[130px] dark:bg-[#315cff]/[0.06]" />
      <div className="pointer-events-none absolute -right-40 top-16 size-[400px] rounded-full bg-[#00a7ff]/[0.03] blur-[110px] dark:bg-[#00a7ff]/[0.05]" />
      <div className="absolute inset-0 opacity-[0.018] dark:opacity-[0.022] [background-image:linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] dark:[background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:52px_52px]" />

      {/* ── Top divider ── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#315cff]/30 to-transparent dark:via-[#315cff]/50" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-18">

        {/* ── Main grid ── */}
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-12 lg:gap-10"
          variants={reduced ? undefined : staggerContainer(0.15, 0.1)}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >

          {/* Brand */}
          <motion.div
            className="lg:col-span-5"
            variants={reduced ? undefined : fadeLeft}
            transition={tx(0, 0.75)}
          >
            <Link href="/" aria-label="SEROP COMP" className="inline-block">
              <Image
                src="/images/serop-logo-transparent.png"
                alt="SEROP COMP"
                width={220}
                height={100}
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-slate-500 dark:text-white/45">
              {dict.footer.description}
            </p>

            {/* Certification chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {CERTS.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 dark:border-white/10 dark:bg-white/[0.055] dark:text-white/40"
                >
                  <span className="size-1 rounded-full bg-[#315cff]" />
                  {cert}
                </span>
              ))}
            </div>

            {/* Social icons */}
            <div className="mt-7 flex gap-2.5">
              <a
                href={contact.whatsApp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-slate-100 text-slate-400 transition hover:-translate-y-0.5 hover:border-[#14e27d]/40 hover:bg-[#14e27d]/10 hover:text-[#14e27d] dark:border-white/10 dark:bg-white/[0.05] dark:text-white/40"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href={contact.website}
                target="_blank"
                rel="noreferrer"
                aria-label="Website"
                className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-slate-100 text-slate-400 transition hover:-translate-y-0.5 hover:border-[#315cff]/40 hover:bg-[#315cff]/10 hover:text-[#5c7cff] dark:border-white/10 dark:bg-white/[0.05] dark:text-white/40"
              >
                <Globe className="size-4" />
              </a>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            className="lg:col-span-3"
            variants={reduced ? undefined : fadeUp}
            transition={tx(0.15, 0.75)}
          >
            <h3 className="mb-5 font-mono text-[9px] uppercase tracking-[0.28em] text-slate-400 dark:text-white/30">
              {dict.footer.products_title}
            </h3>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p}>
                  <Link
                    href="/products"
                    className="group flex items-center gap-2.5 text-[13px] text-slate-500 transition hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
                  >
                    <span className="h-px w-3 bg-slate-200 transition-all duration-300 group-hover:w-5 group-hover:bg-[#315cff] dark:bg-white/15" />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="lg:col-span-4"
            variants={reduced ? undefined : fadeRight}
            transition={tx(0.3, 0.75)}
          >
            <h3 className="mb-5 font-mono text-[9px] uppercase tracking-[0.28em] text-slate-400 dark:text-white/30">
              {dict.footer.contact_title}
            </h3>

            <div className="space-y-2.5">

              {/* Email */}
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-[#315cff]/35 hover:bg-[#315cff]/[0.05] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-[#315cff]/35 dark:hover:bg-[#315cff]/[0.08]"
              >
                <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#315cff]/10 dark:bg-[#315cff]/15">
                  <Mail className="size-3.5 text-[#5c7cff]" />
                </div>
                <div>
                  <div className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-slate-400 dark:text-white/28">Email</div>
                  <div className="text-[13px] text-slate-600 transition group-hover:text-slate-900 dark:text-white/60 dark:group-hover:text-white">{contact.email}</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${contact.phoneHref}`}
                className="group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-[#315cff]/35 hover:bg-[#315cff]/[0.05] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-[#315cff]/35 dark:hover:bg-[#315cff]/[0.08]"
              >
                <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#315cff]/10 dark:bg-[#315cff]/15">
                  <Phone className="size-3.5 text-[#5c7cff]" />
                </div>
                <div>
                  <div className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-slate-400 dark:text-white/28">Phone</div>
                  <div dir="ltr" className="text-[13px] text-slate-600 transition group-hover:text-slate-900 dark:text-white/60 dark:group-hover:text-white">{contact.phoneDisplay}</div>
                </div>
              </a>

              {/* Address */}
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-[#315cff]/35 hover:bg-[#315cff]/[0.05] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-[#315cff]/35 dark:hover:bg-[#315cff]/[0.08]"
              >
                <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[#315cff]/10 dark:bg-[#315cff]/15">
                  <MapPin className="size-3.5 text-[#5c7cff]" />
                </div>
                <div>
                  <div className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-slate-400 dark:text-white/28">{dict.footer.map_link}</div>
                  <div className="text-[13px] leading-relaxed text-slate-600 transition group-hover:text-slate-900 dark:text-white/60 dark:group-hover:text-white">
                    {isAr ? contact.addressAr : contact.addressEn}
                  </div>
                </div>
              </a>

            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-7 dark:border-white/[0.07] sm:flex-row sm:items-center"
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={tx(0.1, 0.6)}
        >
          <div className="flex items-center gap-3">
            <span className="size-1.5 animate-pulse rounded-full bg-[#14e27d]" />
            <p className="text-xs text-slate-400 dark:text-white/28">
              © {new Date().getFullYear()} SEROP COMP — {dict.footer.copyright}
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-[11px] text-slate-400 dark:text-white/28">
            <Link href="#" className="transition hover:text-slate-700 dark:hover:text-white/55">{dict.footer.privacy}</Link>
            <Link href="#" className="transition hover:text-slate-700 dark:hover:text-white/55">{dict.footer.terms}</Link>
            <span className="font-mono uppercase tracking-[0.2em] text-slate-300 dark:text-white/18">{dict.footer.made_in}</span>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
