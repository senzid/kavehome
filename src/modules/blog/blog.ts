import { cache } from "react"
import blogFallback from "@/data/endpoints-response/blog.json"
import type { Blog, BlogCover } from "@/modules/blog/types"

type BlogApiResponse = {
  results: Blog[]
}

const FALLBACK_BLOG = blogFallback as BlogApiResponse

function toBlogCover(blog: Blog): BlogCover {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    coverImage: blog.coverImage,
    linkText: blog.linkText,
  }
}

async function fetchBlogPosts(): Promise<Blog[]> {
  return FALLBACK_BLOG.results
}

export const getBlogPost = cache(async (slug: string): Promise<Blog | undefined> => {
  const posts = await fetchBlogPosts()
  return posts.find((post) => post.slug === slug)
})

export const getBlogCovers = cache(async (): Promise<BlogCover[]> => {
  const posts = await fetchBlogPosts()
  return posts.map(toBlogCover)
})
