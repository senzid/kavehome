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
  empty?: "placeholder" | "blank"
  className?: string
  children?: ReactNode
}

function EmptyMediaPlaceholder() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center text-neutral-300"
      aria-hidden
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-8 md:size-10"
      >
        <rect
          x="5"
          y="8"
          width="30"
          height="24"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 26.5L13.5 19L19 24L25.5 16.5L35 26.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function MediaFrame({
  src,
  alt = "",
  aspect = "4/5",
  sizes,
  priority = false,
  empty = "placeholder",
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
      ) : empty === "placeholder" ? (
        <EmptyMediaPlaceholder />
      ) : null}
      {children}
    </div>
  )
}
