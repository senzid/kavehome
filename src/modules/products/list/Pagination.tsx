import Link from "next/link"
import Image from "next/image"
import { getVisiblePages, pageHref } from "./pagination"

type PaginationProps = {
  currentPage: number
  totalPages: number
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
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
        >
          <Image src="/icons/chevron-left.svg" alt="Anterior" width={24} height={24}/>
        </Link>
      ) : (
        <Image src="/icons/chevron-left.svg" alt="Anterior" className="opacity-30" width={24} height={24}/>
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
                  {item}
                </span>
              ) : (
                <Link
                  href={pageHref(item)}
                  className="inline-flex min-w-10 items-center justify-center px-3 py-2 text-sm text-neutral-700 hover:text-black"
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
        >
          <Image src="/icons/chevron-right.svg" alt="Siguiente" width={24} height={24}/>
        </Link>
      ) : (
        <Image src="/icons/chevron-right.svg" alt="Siguiente" className="opacity-30" width={24} height={24}/>
      )}
    </nav>
  )
}

export default Pagination
