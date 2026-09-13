import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogArticle, getBlogPost, getBlogSlugs } from "@/modules/blog"
import { buildPageMetadata, noIndexRobots } from "@/lib/seo"

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
    return { robots: noIndexRobots }
  }

  return buildPageMetadata({
    // seoTitle already includes brand; avoid "| Kave Home" duplication.
    title: { absolute: post.seoTitle },
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    images: [post.coverImage],
    type: "article",
  })
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
