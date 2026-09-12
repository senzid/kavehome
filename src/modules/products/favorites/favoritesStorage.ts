import type { Product } from "@/modules/products/types"

export const FAVORITES_STORAGE_KEY = "kavehome:favorites"

export type FavoritesMap = Record<string, Product>

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false

  const product = value as Record<string, unknown>

  return (
    typeof product.sku === "string" &&
    product.sku.length > 0 &&
    typeof product.title === "string" &&
    typeof product.description === "string" &&
    (product.image === null || typeof product.image === "string") &&
    (product.price === null || typeof product.price === "number") &&
    (product.salePrice === null || typeof product.salePrice === "number")
  )
}

export function readFavorites(): FavoritesMap {
  if (typeof window === "undefined") return {}

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) return {}

    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {}
    }

    const favorites: FavoritesMap = {}

    for (const [sku, value] of Object.entries(parsed)) {
      if (isProduct(value) && value.sku === sku) {
        favorites[sku] = value
      }
    }

    return favorites
  } catch {
    return {}
  }
}

export function writeFavorites(favorites: FavoritesMap): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    )
  } catch {
    // Ignore quota / private mode failures.
  }
}
