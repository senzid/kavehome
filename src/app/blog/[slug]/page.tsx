import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPost, getBlogSlugs } from "@/modules/blog/blog"
import BlogArticle from "@/modules/blog/BlogArticle"

export const revalidate = 86400 // 24h
export const dynamicParams = false

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Artículo no encontrado — Kavehome",
    }
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main>
      <BlogArticle post={post} />
    </main>
  )
}
