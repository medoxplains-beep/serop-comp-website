"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, MessageCircle, Send } from "lucide-react"
import { SectionHeader } from "./section-header"
import { useI18n } from "@/components/i18n-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sending,   setSending]   = useState(false)
  const { dict } = useI18n()

  return (
    <section id="quote" className="relative py-24 lg:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_60%_50%,rgba(49,92,255,0.06),transparent_65%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ── Left: info ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-5"
          >
            <SectionHeader
              eyebrow={dict.quoteForm.eyebrow}
              title={dict.quoteForm.title}
              description={dict.quoteForm.description}
            />

            <div className="mt-10 space-y-3">
              <ContactCard label={dict.contact.channels.email}   value="info@seropcomp.com"       href="mailto:info@seropcomp.com" />
              <ContactCard label={dict.contact.channels.phone}   value="01151988818"               href="tel:+201151988818" />
              <ContactCard label={dict.contact.channels.address} value={dict.contact.channels.address_value} />
            </div>

            <a
              href="https://wa.me/201151988818"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#315cff]/40 hover:shadow-[#315cff]/10"
            >
              <MessageCircle className="size-4 text-[#14e27d]" />
              {dict.quoteForm.chat_whatsapp}
            </a>
          </motion.div>

          {/* ── Right: form ────────────────────────────────────────── */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            onSubmit={async (e) => {
              e.preventDefault()
              setSending(true)
              const fd   = new FormData(e.currentTarget)
              const data = Object.fromEntries(fd.entries())
              try {
                await fetch("/api/quote", {
                  method:  "POST",
                  headers: { "Content-Type": "application/json" },
                  body:    JSON.stringify(data),
                })
              } catch { /* fail silently */ }
              setSending(false)
              setSubmitted(true)
            }}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 shadow-xl shadow-[#315cff]/5 backdrop-blur sm:p-8 lg:col-span-7 dark:bg-[#0b1d33]/60 dark:border-white/10"
          >
            {/* Background grid */}
            <div className="absolute inset-0 bg-blueprint-fine opacity-40" />
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#315cff]/40 to-transparent" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative flex min-h-[400px] flex-col items-center justify-center gap-5 text-center"
              >
                <div className="grid size-20 place-items-center rounded-full bg-[#315cff]/10 ring-4 ring-[#315cff]/20">
                  <CheckCircle2 className="size-10 text-[#315cff]" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">{dict.quoteForm.success_title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">{dict.quoteForm.success_desc}</p>
                </div>
                <Badge variant="blue" className="px-4 py-1.5 text-sm">
                  {dict.quoteForm.eyebrow}
                </Badge>
              </motion.div>
            ) : (
              <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label={dict.quoteForm.fields.name}     name="name"     required />
                <FormField label={dict.quoteForm.fields.company}  name="company" />
                <FormField label={dict.quoteForm.fields.phone}    name="phone"    type="tel"    required />
                <FormField label={dict.quoteForm.fields.email}    name="email"    type="email"  required />
                <FormField label={dict.quoteForm.fields.capacity} name="capacity" />
                <FormField label={dict.quoteForm.fields.quantity} name="quantity" type="number" />

                {/* Textarea */}
                <div className="space-y-2 sm:col-span-2">
                  <Label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {dict.quoteForm.fields.message}
                  </Label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={dict.quoteForm.fields.message_placeholder}
                    className={cn(
                      "flex w-full rounded-md border border-input bg-background/50 px-4 py-3 text-sm text-foreground shadow-sm",
                      "placeholder:text-muted-foreground/60",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                      "ring-offset-background transition-colors"
                    )}
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2 sm:col-span-2">
                  <Button type="submit" variant="glow" size="lg" disabled={sending} className="rounded-full gap-2.5 px-8">
                    <Send className={cn("size-4", sending && "animate-pulse")} />
                    {sending ? "..." : dict.quoteForm.submit}
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full gap-2.5 px-8 border-border hover:border-[#315cff]/40">
                    <a href="https://wa.me/201151988818" target="_blank" rel="noreferrer">
                      <MessageCircle className="size-4 text-[#14e27d]" />
                      {dict.quoteForm.whatsapp}
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </motion.form>

        </div>
      </div>
    </section>
  )
}

// ── Reusable field ─────────────────────────────────────────────────────────
function FormField({ label, name, type = "text", required }: {
  label: string; name: string; type?: string; required?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}{required && <span className="ml-0.5 text-[#315cff]">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        name={name}
        required={required}
        className="bg-background/50 text-sm focus-visible:ring-[#315cff]/50 dark:bg-white/[0.05]"
      />
    </div>
  )
}

// ── Contact card ───────────────────────────────────────────────────────────
function ContactCard({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <Card className="p-4 bg-card/30 border-border/50 backdrop-blur hover:border-[#315cff]/30 transition dark:bg-white/[0.04] dark:border-white/8">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      {href ? (
        <a href={href} className="mt-1 block text-sm font-semibold text-foreground hover:text-primary transition-colors">{value}</a>
      ) : (
        <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
      )}
    </Card>
  )
}
