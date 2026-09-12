import Image from "next/image"
import type { Category } from "@/modules/home/categories/types"

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { name, highlightImage } = category

  if (!highlightImage) return null

  return (
    <article className="flex w-full flex-col gap-3">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-100">
        <Image
          src={highlightImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 250px, 320px"
          className="object-cover"
        />
      </div>
      <h3 className="text-base md:text-lg">{name}</h3>
    </article>
  )
}

export default CategoryCard