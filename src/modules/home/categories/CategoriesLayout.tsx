import type { Category } from "@/modules/home/categories/category"
import CategoryCard from "./CategoryCard"
import CategoriesScroller from "./CategoriesScroller"

type CategoriesLayoutProps = {
  categories: Category[]
}

export default function CategoriesLayout({ categories }: CategoriesLayoutProps) {
  if (categories.length === 0) return null

  return (
    <section aria-label="Categorías" className="flex w-full flex-col gap-6 px-6 py-10 md:px-18 md:py-26">
      <CategoriesScroller>
        {categories.map((category) => (
          <li
            key={category.id}
            className="w-62.5 shrink-0 snap-start md:w-full"
          >
            <CategoryCard category={category} />
          </li>
        ))}
      </CategoriesScroller>
    </section>
  )
}
