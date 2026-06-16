"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { navLinks } from "@/lib/nav"
import { useI18n } from "@/components/i18n-provider"

// ── Theme Toggle ──────────────────────────────────────
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  if (!mounted) return <div className="h-8 w-16 rounded-full bg-muted" />

  const isDark = theme === "dark"

  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")} aria-label="Toggle theme"
      className="relative flex h-8 w-16 items-center rounded-full border border-border p-1 transition-all"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #0b1d33, #06111f)"
          : "linear-gradient(135deg, #e8f8ff, #f7fcff)",
      }}>
      <Sun className="absolute left-1.5 size-3.5 text-sky-300 opacity-70" />
      <Moon className="absolute right-1.5 size-3.5 text-blue-400 opacity-60" />
      <motion.div layout animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="relative z-10 flex size-6 items-center justify-center rounded-full shadow-sm"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #315cff, #18d4ff)"
            : "linear-gradient(135deg, #315cff, #00a7ff)",
        }}>
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div key="moon" initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <Moon className="size-3.5 text-white" />
            </motion.div>
          ) : (
            <motion.div key="sun" initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <Sun className="size-3.5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  )
}

// ── Language Toggle ───────────────────────────────────
function LanguageToggle() {
  const { locale } = useI18n()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const toggle = async () => {
    const next = locale === "en" ? "ar" : "en"
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    })
    startTransition(() => router.refresh())
  }

  return (
    <button onClick={toggle} disabled={isPending}
      className="flex h-8 items-center gap-1.5 rounded-full border border-border bg-muted px-3 text-xs font-bold text-muted-foreground transition hover:border-primary/50 hover:text-foreground disabled:opacity-50">
      <AnimatePresence mode="wait">
        <motion.span key={locale} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.15 }}>
          {locale === "en" ? "AR" : "EN"}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

// ── Main Header ───────────────────────────────────────
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { dict } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled
        ? "border-b border-white/60 bg-white/55 shadow-sm shadow-[#315cff]/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#06111f]/70"
        : "bg-transparent"
    }`}>
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 lg:px-10">

        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="SEROP COMP">
          <Image
            src="/images/serop-logo-transparent.png"
            alt="SEROP COMP"
            width={210}
            height={96}
            priority
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "text-[#0b1728] dark:text-white"
                  : "text-[#526173] hover:text-[#0b1728] dark:text-white/72 dark:hover:text-white"
              }`}>
              {dict.breadcrumbs[l.key]}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <LanguageToggle />
          <Link href="/request-quote"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#315cff] to-[#00a7ff] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#315cff]/15 transition hover:brightness-110">
            {dict.cta.primary}
          </Link>
        </div>

        {/* Mobile button */}
        <button onClick={() => setOpen(!open)}
          className="grid size-10 place-items-center rounded-md border border-border text-foreground lg:hidden"
          aria-label="Toggle menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-4 py-3 text-sm font-medium transition hover:bg-muted ${
                    isActive(l.href) ? "text-foreground" : "text-muted-foreground"
                  }`}>
                  {dict.breadcrumbs[l.key]}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-2 px-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <Link href="/request-quote"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">
                {dict.cta.primary}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
