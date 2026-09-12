import Header from "@/components/layout/header/Header";
import Hero from "@/modules/home/hero/Hero";
import CategoriesLayout from "@/modules/home/categories/CategoriesLayout";
import { getHomeCategories } from "@/modules/home/categories/categories";
import { getBlogCovers } from "@/modules/blog/blog";
import BlogLayout from "@/modules/blog/BlogLayout";

export const revalidate = 86400; // 24h

export default async function Home() {
  const categories = await getHomeCategories();
  const blogPosts = await getBlogCovers();

  return (
    <>
      <Header />
      <main>
        <div className="relative flex h-[calc(100dvh-var(--header-height))] min-h-0 flex-col">
          <Hero />
        </div>
        <CategoriesLayout categories={categories} />
        <BlogLayout blogPosts={blogPosts} />
      </main>
    </>
  );
}
