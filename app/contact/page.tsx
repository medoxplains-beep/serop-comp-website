import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { getRequestLocale } from "@/lib/get-request-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

const mapAddress = "A4 Pieces No.116, 10th of Ramadan City 1, Al-Sharqia Governorate 7068322, Egypt"
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`
const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getRequestLocale())
  return {
    title: dict.contact.meta_title,
    description: dict.contact.meta_desc,
  }
}

export default async function ContactPage() {
  const dict = getDictionary(await getRequestLocale())
  const channels = [
    { icon: Mail, label: dict.contact.channels.email, value: "info@seropcomp.com", href: "mailto:info@seropcomp.com" },
    { icon: Phone, label: dict.contact.channels.phone, value: "01151988818", href: "tel:+201151988818" },
    { icon: MessageCircle, label: dict.contact.channels.whatsapp, value: dict.contact.channels.whatsapp_value, href: "https://wa.me/201151988818" },
    { icon: MapPin, label: dict.contact.channels.address, value: dict.contact.channels.address_value, href: googleMapsUrl },
    { icon: Clock, label: dict.contact.channels.hours, value: dict.contact.channels.hours_value },
  ]

  return (
    <>
      <PageHero
        eyebrow={dict.contact.hero_eyebrow}
        title={dict.contact.hero_title}
        description={dict.contact.hero_desc}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.contact },
        ]}
      />
      <section className="relative py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c) => (
              <div key={c.label} className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
                <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="size-5" />
                </div>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-1 block font-display text-base font-bold text-foreground hover:text-primary"
                  >
                    {c.value}
                  </a>
                ) : (
                  <div className="mt-1 font-display text-base font-bold text-foreground">{c.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40">
            <iframe
              title="SEROP COMP location"
              src={googleMapsEmbedUrl}
              className="block h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
