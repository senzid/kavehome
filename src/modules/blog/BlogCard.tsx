import Link from "next/link"
import MediaFrame from "@/components/ui/MediaFrame"
import { buttonSurfaceClassName } from "@/components/ui/buttonStyles"
import type { BlogCover } from "./types"

type BlogCardProps = {
  blogPost: BlogCover
}

export default function BlogCard({ blogPost }: BlogCardProps) {
  const { title, coverImage, slug, linkText } = blogPost

  if (!coverImage) return null

  return (
    <article className="group">
      <MediaFrame
        src={coverImage}
        alt={title}
        sizes="(max-width: 768px) 100vw, 33vw"
      >
        <div className="absolute inset-0 flex flex-col items-start justify-between p-6 md:p-8">
          <h3 className="text-2xl text-white md:text-3xl">{title}</h3>
          <span
            className={buttonSurfaceClassName({
              variant: "solid",
              className: "group-hover:opacity-80",
            })}
            aria-hidden
          >
            {linkText}
          </span>
        </div>
        <Link
          href={`/blog/${slug}`}
          className="absolute inset-0 z-1 focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label={linkText}
        />
      </MediaFrame>
    </article>
  )
}
