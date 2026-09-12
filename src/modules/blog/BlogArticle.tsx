import Image from "next/image"
import ReactMarkdown from "react-markdown"
import type { Blog } from "./types"

type BlogArticleProps = {
  post: Blog
}

const BlogArticle = ({ post }: BlogArticleProps) => {
  const { title, coverImage, content } = post

  return (
    <article className="pb-16 md:pb-24">
      <header className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100 md:aspect-21/9">
        <Image
          src={coverImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-black/30"
        />
        <div className="absolute inset-0 flex items-end py-8 md:py-12">
          <h1 className="mx-auto w-full max-w-3xl px-6 text-3xl leading-tight tracking-tight text-white md:text-5xl">
            {title}
          </h1>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-3xl space-y-4 px-6 text-base leading-relaxed text-neutral-700 md:mt-10 md:text-lg [&_p]:m-0">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  )
}

export default BlogArticle
