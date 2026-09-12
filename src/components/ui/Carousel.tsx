"use client"

import { useRef, type ReactNode } from "react"
import Image from "next/image"

const LIST_BASE = "flex snap-x snap-mandatory overflow-x-auto"

type CarouselProps = {
  children: ReactNode
  title?: string
  scrollArrow?: boolean
  listClassName?: string
  prevLabel?: string
  nextLabel?: string
}

const Carousel = ({
  children,
  title,
  scrollArrow = true,
  listClassName = "",
  prevLabel = "Ver anteriores",
  nextLabel = "Ver siguientes",
}: CarouselProps) => {
  const listRef = useRef<HTMLUListElement>(null)

  const scrollByItem = (direction: -1 | 1) => {
    const list = listRef.current
    if (!list) return

    const firstItem = list.firstElementChild as HTMLElement | null
    if (!firstItem) return

    const styles = getComputedStyle(list)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
    list.scrollBy({ left: direction * (firstItem.offsetWidth + gap), behavior: "smooth" })
  }

  return (
    <>
      {(title || scrollArrow) && (
        <div className="flex flex-row items-center justify-between">
          {title ? <h2 className="text-xl flex-1">{title}</h2> : null}
          {scrollArrow ? (
            <div className={`flex ${!title && 'w-full'} flex-row justify-end gap-2 md:hidden`}>
              <button
                type="button"
                aria-label={prevLabel}
                onClick={() => scrollByItem(-1)}
              >
                <Image src="/icons/arrow-left.svg" alt="" width={20} height={20} aria-hidden />
              </button>
              <button
                type="button"
                aria-label={nextLabel}
                onClick={() => scrollByItem(1)}
              >
                <Image src="/icons/arrow-right.svg" alt="" width={20} height={20} aria-hidden />
              </button>
            </div>
          ) : null}
        </div>
      )}
      <ul ref={listRef} className={`${LIST_BASE} ${listClassName}`.trim()}>
        {children}
      </ul>
    </>
  )
}

export default Carousel
