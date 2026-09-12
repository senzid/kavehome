import type { Category } from "@/modules/home/categories/types"
import Carousel from "@/components/ui/Carousel"
import CategoryCard from "./CategoryCard"

type CategoriesLayoutProps = {
  categories: Category[]
}

const CategoriesLayout = ({ categories }: CategoriesLayoutProps) => {
  if (categories.length === 0) return null

  return (
    <section aria-label="Categorías" className="flex w-full flex-col gap-6 px-6 py-10 md:px-18 md:py-26">
      <Carousel
        title="Todo para tu hogar"
        prevLabel="Ver categorías anteriores"
        nextLabel="Ver categorías siguientes"
        listClassName="gap-4 pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-4"
      >
        {categories.map((category) => (
          <li
            key={category.id}
            className="w-62.5 shrink-0 snap-start md:w-full"
          >
            <CategoryCard category={category} />
          </li>
        ))}
      </Carousel>
    </section>
  )
}

export default CategoriesLayout