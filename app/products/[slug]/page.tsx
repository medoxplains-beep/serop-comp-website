import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ProductCard } from "@/components/product-card"
import { getRequestLocale } from "@/lib/get-request-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getProductBySlug, products } from "@/lib/products"

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Product not found" }
  const locale = await getRequestLocale()
  return {
    title: locale === "ar" ? product.nameAr : product.name,
    description: locale === "ar" ? product.descriptionAr : product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const locale = await getRequestLocale()
  const dict = getDictionary(locale)
  const isAr = locale === "ar"
  const productName = isAr ? product.nameAr : product.name
  const productDescription = isAr ? product.descriptionAr : product.description
  const longDescription = isAr ? product.longDescriptionAr : product.longDescription
  const features = isAr ? product.featuresAr : product.features
  const applications = isAr ? product.applicationsAr : product.applications
  const orientationLabel =
    product.orientation === "vertical"
      ? dict.products.filters.vertical
      : product.orientation === "horizontal"
        ? dict.products.filters.horizontal
        : dict.products.filters.custom
  const finishLabel =
    product.finish === "galvanized"
      ? dict.products.filters.galvanized
      : product.finish === "painted"
        ? dict.products.filters.painted
        : dict.products.filters.custom
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={`${orientationLabel} / ${finishLabel}`}
        title={productName}
        description={productDescription}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.products, href: "/products" },
          { label: productName },
        ]}
      />

      <section className="relative py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className={`relative w-full overflow-hidden rounded-2xl border border-border/60 bg-card/30 ${
              product.orientation === "horizontal" ? "aspect-[5/3]" : "aspect-[4/5]"
            }`}>
              <Image
                src={product.image}
                alt={productName}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-8 drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur sm:p-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {isAr ? "المواصفات الفنية" : "Technical Specifications"}
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  { label: dict.showcase.specs.capacity,         value: product.capacity },
                  { label: dict.showcase.specs.working_pressure, value: product.workingPressure },
                  { label: dict.showcase.specs.test_pressure,    value: product.testPressure },
                  { label: dict.showcase.specs.dimensions,       value: product.dimensions },
                  { label: isAr ? "الوزن" : "Weight",           value: product.weight },
                  { label: dict.showcase.specs.motor,            value: product.motorHP },
                  { label: isAr ? "الاتجاه" : "Orientation",    value: orientationLabel },
                  { label: dict.showcase.specs.finish,           value: finishLabel },
                  { label: isAr ? "كود المنتج" : "Product Code", value: product.code },
                ].map((s) => (
                  <div key={s.label}>
                    <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                    <dd className="mt-1 font-display text-base font-bold text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/request-quote?product=${product.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  {dict.cta.primary}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://wa.me/201151988818"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/60"
                >
                  <MessageCircle className="size-4" />
                  {dict.showcase.whatsapp}
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-bold">{isAr ? "الوصف" : "Description"}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{longDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-card/20 py-16 lg:py-20">
        <div className="absolute inset-0 bg-blueprint-fine opacity-30" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{isAr ? "المميزات" : "Features"}</h2>
            <ul className="mt-6 space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground/90">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{isAr ? "التطبيقات" : "Applications"}</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {applications.map((a) => (
                <li
                  key={a}
                  className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm font-medium text-foreground backdrop-blur"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              {isAr ? "منتجات ذات صلة" : "Related Products"}
            </h2>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              {dict.productsTeaser.view_all}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
