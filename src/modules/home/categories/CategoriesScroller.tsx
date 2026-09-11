"use client"

import { useRef, type ReactNode } from "react"
import Image from "next/image"

type CategoriesScrollerProps = {
  children: ReactNode
}

export default function CategoriesScroller({ children }: CategoriesScrollerProps) {
  const listRef = useRef<HTMLUListElement>(null)

  const scrollByItem = (direction: -1 | 1) => {
    const list = listRef.current
    if (!list) return

    console.log(list)

    const firstItem = list.firstElementChild as HTMLElement | null
    if (!firstItem) return

    const styles = getComputedStyle(list)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
    list.scrollBy({ left: direction * (firstItem.offsetWidth + gap), behavior: "smooth" })
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl">Todo para tu hogar</h2>
        <div className="flex flex-row gap-2 md:hidden">
          <button
            type="button"
            aria-label="Ver categorías anteriores"
            onClick={() => scrollByItem(-1)}
          >
            <Image src="/icons/arrow-left.svg" alt="" width={20} height={20} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Ver categorías siguientes"
            onClick={() => scrollByItem(1)}
          >
            <Image src="/icons/arrow-right.svg" alt="" width={20} height={20} aria-hidden />
          </button>
        </div>
      </div>
      <ul
        ref={listRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-4"
      >
        {children}
      </ul>
    </>
  )
}
