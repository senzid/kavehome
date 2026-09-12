import Image from "next/image"
import ButtonLink from "@/components/ui/ButtonLink"
import type { BlogCover } from "./types"

type BlogCardProps = {
  blogPost: BlogCover
}

const BlogCard = ({ blogPost }: BlogCardProps) => {
  const { title, coverImage, slug, linkText } = blogPost

  if (!coverImage) return null

  return (
    <article className="relative aspect-4/5 w-full overflow-hidden bg-neutral-100">
      <Image
        src={coverImage}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-start justify-between p-6 md:p-8">
        <h3 className="text-2xl text-white md:text-3xl">{title}</h3>
        <ButtonLink href={`/blog/${slug}`} variant="solid">
          {linkText}
        </ButtonLink>
      </div>
    </article>
  )
}

export default BlogCard
