import Image from "next/image"
import type { ReactNode } from "react"

export type MediaAspect = "4/5" | "square"

const aspectClassName: Record<MediaAspect, string> = {
  "4/5": "aspect-4/5",
  square: "aspect-square",
}

type MediaFrameProps = {
  src?: string | null
  alt?: string
  aspect?: MediaAspect
  sizes?: string
  priority?: boolean
  className?: string
  children?: ReactNode
}

export default function MediaFrame({
  src,
  alt = "",
  aspect = "4/5",
  sizes,
  priority = false,
  className = "",
  children,
}: MediaFrameProps) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden bg-neutral-100",
        aspectClassName[aspect],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : null}
      {children}
    </div>
  )
}
