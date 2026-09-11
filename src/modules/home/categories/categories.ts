import { cache } from "react"
import categoriesFallback from "@/data/endpoints-response/categories.json"
import { apiGet } from "@/lib/api"
import type {
  CategoriesApiResponse,
  Category,
  CategoryApi,
} from "@/modules/home/categories/category"

const REVALIDATE_SECONDS = 60 * 60 * 24 // 24h

const FALLBACK_CATEGORIES = categoriesFallback as CategoriesApiResponse

function toCategory(category: CategoryApi): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    highlightImage: category.highlightImage,
  }
}

function isHomeCategory(
  category: CategoryApi,
): category is CategoryApi & { highlightImage: string } {
  return category.mainParent === null
}

async function fetchCategories(): Promise<CategoryApi[]> {
  const data = await apiGet<CategoriesApiResponse>("categories/", {
    revalidate: REVALIDATE_SECONDS,
    tags: ["categories"],
    fallback: FALLBACK_CATEGORIES,
  })

  return data.results
}

export const getHomeCategories = cache(async (): Promise<Category[]> => {
  const categories = await fetchCategories()
  return categories.filter(isHomeCategory).map(toCategory)
})
