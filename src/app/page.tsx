import Header from "@/components/layout/header/Header";
import Hero from "@/modules/home/Hero";
import CategoriesLayout from "@/modules/home/categories/CategoriesLayout";
import { getHomeCategories } from "@/modules/home/categories/categories";

export const revalidate = 60 * 60 * 24;

export default async function Home() {
  const categories = await getHomeCategories();

  return (
    <>
      <Header />
      <main>
        <div className="relative flex h-[calc(100dvh-var(--header-height))] min-h-0 flex-col">
          <Hero />
        </div>
        <CategoriesLayout categories={categories} />
      </main>
    </>
  );
}
