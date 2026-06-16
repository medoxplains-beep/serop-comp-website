import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ProductsGrid } from "@/components/products-grid"
import { CTABanner } from "@/components/cta-banner"
import { getRequestLocale } from "@/lib/get-request-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getRequestLocale())
  return {
    title: dict.products.meta_title,
    description: dict.products.meta_desc,
  }
}

export default async function ProductsPage() {
  const dict = getDictionary(await getRequestLocale())

  return (
    <>
      <PageHero
        eyebrow={dict.products.hero_eyebrow}
        title={dict.products.hero_title}
        description={dict.products.hero_desc}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.products },
        ]}
      />
      <section className="relative py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <ProductsGrid />
        </div>
      </section>
      <CTABanner title={dict.products.cta_title} description={dict.products.cta_desc} />
    </>
  )
}
