import Link from "next/link"
import Image from "next/image"
import { getVisiblePages, pageHref } from "./pagination"

type PaginationProps = {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages(currentPage, totalPages)
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav
      aria-label="Paginación de productos"
      className="flex flex-wrap items-center justify-center gap-2 py-10"
    >
      {hasPrevious ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="px-3 py-2 text-sm text-neutral-700 hover:text-black"
          rel="prev"
          aria-label="Página anterior"
        >
          <Image
            src="/icons/chevron-left.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="px-3 py-2 opacity-30"
        >
          <Image
            src="/icons/chevron-left.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
          <span className="sr-only">Página anterior no disponible</span>
        </span>
      )}

      <ul className="flex flex-wrap items-center justify-center gap-1">
        {visiblePages.map((item, index) =>
          item === "ellipsis" ? (
            <li
              key={`ellipsis-${index}`}
              className="px-2 text-sm text-neutral-400"
              aria-hidden
            >
              …
            </li>
          ) : (
            <li key={item}>
              {item === currentPage ? (
                <span
                  aria-current="page"
                  className="inline-flex min-w-10 items-center justify-center px-3 py-2 text-sm font-medium"
                >
                  <span className="sr-only">Página </span>
                  {item}
                </span>
              ) : (
                <Link
                  href={pageHref(item)}
                  className="inline-flex min-w-10 items-center justify-center px-3 py-2 text-sm text-neutral-700 hover:text-black"
                  aria-label={`Ir a la página ${item}`}
                >
                  {item}
                </Link>
              )}
            </li>
          ),
        )}
      </ul>

      {hasNext ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="px-3 py-2 text-sm text-neutral-700 hover:text-black"
          rel="next"
          aria-label="Página siguiente"
        >
          <Image
            src="/icons/chevron-right.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="px-3 py-2 opacity-30"
        >
          <Image
            src="/icons/chevron-right.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
          <span className="sr-only">Página siguiente no disponible</span>
        </span>
      )}
    </nav>
  )
}
