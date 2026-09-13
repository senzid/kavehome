export function pageHref(page: number): string {
  return page <= 1 ? "/products" : `/products?page=${page}`
}

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  let start = Math.max(1, currentPage - 1)
  let end = Math.min(totalPages, currentPage + 1)

  if (currentPage <= 2) {
    start = 1
    end = Math.min(totalPages, 3)
  }

  const result: (number | "ellipsis")[] = []

  for (let page = start; page <= end; page += 1) {
    result.push(page)
  }

  if (end < totalPages) {
    result.push("ellipsis")
  }

  return result
}
