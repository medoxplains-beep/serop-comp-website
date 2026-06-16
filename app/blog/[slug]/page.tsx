import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { CTABanner } from "@/components/cta-banner"
import { PageHero } from "@/components/page-hero"
import { getRequestLocale } from "@/lib/get-request-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getPostBySlug, posts } from "@/lib/blog"

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Post not found" }
  const locale = await getRequestLocale()
  return {
    title: locale === "ar" ? post.titleAr : post.title,
    description: locale === "ar" ? post.excerptAr : post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const locale = await getRequestLocale()
  const dict = getDictionary(locale)
  const isAr = locale === "ar"
  const title = isAr ? post.titleAr : post.title
  const excerpt = isAr ? post.excerptAr : post.excerpt
  const category = isAr ? post.categoryAr : post.category
  const readTime = isAr ? post.readTimeAr : post.readTime
  const content = isAr ? post.contentAr : post.content
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <PageHero
        eyebrow={`${category} / ${readTime}`}
        title={title}
        description={excerpt}
        breadcrumbs={[
          { label: dict.breadcrumbs.home, href: "/" },
          { label: dict.breadcrumbs.blog, href: "/blog" },
          { label: title },
        ]}
      />
      <article className="relative py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border/60 bg-card/30">
            <Image src={post.image} alt={title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-contain p-4" priority />
          </div>
          <div className="space-y-6 text-base leading-relaxed text-foreground/90 sm:text-lg">
            {content.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="mt-12 border-t border-border/60 pt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {dict.blog.published} {new Date(post.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="relative border-t border-border/60 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">{dict.blog.continue_reading}</h2>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                {dict.blog.all_articles}
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((p) => {
                const relatedTitle = isAr ? p.titleAr : p.title
                const relatedExcerpt = isAr ? p.excerptAr : p.excerpt
                const relatedCategory = isAr ? p.categoryAr : p.category

                return (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex gap-5 rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur transition hover:border-primary/40">
                    <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-lg bg-card/30">
                      <Image src={p.image} alt={relatedTitle} fill sizes="120px" className="object-contain p-2" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{relatedCategory}</div>
                      <h3 className="mt-1 font-display text-base font-bold leading-snug line-clamp-2 group-hover:text-primary">{relatedTitle}</h3>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{relatedExcerpt}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
      <CTABanner />
    </>
  )
}
