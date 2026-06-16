import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { QuoteForm } from "@/components/quote-form"
import { getRequestLocale } from "@/lib/get-request-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getRequestLocale())
  return {
    title: dict.quoteForm.eyebrow,
    description: dict.quoteForm.description,
  }
}

export default async function RequestQuotePage() {
  const dict = getDictionary(await getRequestLocale())

  return (
    <>
      <PageHero
        eyebrow={dict.quoteForm.eyebrow}
        title={dict.quoteForm.title}
        description={dict.quoteForm.description}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.request_quote },
        ]}
      />
      <QuoteForm />
    </>
  )
}
