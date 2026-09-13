export type Category = {
  id: number
  name: string
  highlightImage: string | null
  slug: string
}

export type CategoryParent = {
  id: number
  pimCode: string
  name: string
  slug: string
  highlightImage: string | null
}

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
