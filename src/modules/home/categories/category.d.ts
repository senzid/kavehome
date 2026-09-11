/** Minimal UI contract used by home category cards. */
export type Category = {
  id: number
  name: string
  highlightImage: string | null
  slug: string
}

/** Parent reference as returned by the categories API. */
export type CategoryParent = {
  id: number
  pimCode: string
  name: string
  slug: string
  highlightImage: string | null
}

/** Fields we read from each API result. */
export type CategoryApi = {
  id: number
  name: string
  slug: string
  highlightImage: string | null
  mainParent: CategoryParent | null
}

export type CategoriesApiResponse = {
  count?: number
  next?: string | null
  previous?: string | null
  results: CategoryApi[]
}
