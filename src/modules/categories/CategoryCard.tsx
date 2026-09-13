import MediaFrame from "@/components/ui/MediaFrame"
import type { Category } from "./types"

type CategoryCardProps = {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { name, highlightImage } = category

  if (!highlightImage) return null

  return (
    <article className="flex w-full flex-col gap-3">
      <MediaFrame
        src={highlightImage}
        alt={name}
        sizes="(max-width: 768px) 250px, 320px"
      />
      <h3 className="text-base md:text-lg">{name}</h3>
    </article>
  )
}

