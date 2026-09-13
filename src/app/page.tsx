import {
  CategoriesSection,
  getHomeCategories,
} from "@/modules/categories"
import { BlogSection, getBlogCovers } from "@/modules/blog"
import { Hero } from "@/modules/home"

export const revalidate = 86400 // 24h

export default async function Home() {
  const categories = await getHomeCategories()
  const blogPosts = await getBlogCovers()

  return (
    <main>
      <div className="relative flex h-[calc(100dvh-var(--header-height))] min-h-0 flex-col">
        <Hero />
      </div>
      <CategoriesSection categories={categories} />
      <BlogSection blogPosts={blogPosts} />
    </main>
  )
}
