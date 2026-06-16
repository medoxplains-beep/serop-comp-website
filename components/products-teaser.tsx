"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "./product-card"
import { SectionHeader } from "./section-header"
import { useI18n } from "@/components/i18n-provider"
import { products } from "@/lib/products"

export function ProductsTeaser() {
  const featured = products.slice(0, 3)
  const { dict } = useI18n()

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow={dict.productsTeaser.eyebrow}
            title={dict.productsTeaser.title}
            description={dict.productsTeaser.description}
          />
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-primary/60"
          >
            {dict.productsTeaser.view_all}
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
