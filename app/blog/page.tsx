import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { getRequestLocale } from "@/lib/get-request-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { posts } from "@/lib/blog"

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getRequestLocale())
  return {
    title: dict.blog.meta_title,
    description: dict.blog.meta_desc,
  }
}

export default async function BlogPage() {
  const locale = await getRequestLocale()
  const dict = getDictionary(locale)
  const isAr = locale === "ar"

  return (
    <>
      <PageHero
        eyebrow={dict.blog.hero_eyebrow}
        title={dict.blog.hero_title}
        description={dict.blog.hero_desc}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.blog },
        ]}
      />
      <section className="relative py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const title = isAr ? post.titleAr : post.title
              const excerpt = isAr ? post.excerptAr : post.excerpt
              const category = isAr ? post.categoryAr : post.category
              const readTime = isAr ? post.readTimeAr : post.readTime

              return (
                <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur transition hover:border-primary/40">
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-[5/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span className="text-primary">{category}</span>
                      <span>/</span>
                      <span>{readTime}</span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-bold leading-snug">
                      <Link href={`/blog/${post.slug}`} className="transition hover:text-primary">{title}</Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                      {dict.blog.read_article}
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
