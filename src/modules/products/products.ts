import { cache } from "react"
import productsFallbackPage1 from "@/data/endpoints-response/products.json"
import productsFallbackPage2 from "@/data/endpoints-response/products-2.json"
import productsFallbackPage3 from "@/data/endpoints-response/products-3.json"
import { apiGet } from "@/lib/api"
import {
  getTotalPages,
  normalizePage,
  toProduct,
  toProductDetail,
} from "./productMappers"
import type { ProductApi, ProductDetail, ProductsApiResponse, ProductsPage } from "./types"

export const PRODUCTS_PAGE_SIZE = 20
const REVALIDATE_SECONDS = 60 * 60 * 24 // 24h

const PRODUCTS_FALLBACKS: Record<number, ProductsApiResponse> = {
  1: productsFallbackPage1 as ProductsApiResponse,
  2: productsFallbackPage2 as ProductsApiResponse,
  3: productsFallbackPage3 as ProductsApiResponse,
}

function findProductInFallbacks(sku: string): ProductApi | undefined {
  for (const page of Object.values(PRODUCTS_FALLBACKS)) {
    const found = page.results.find((product) => product.sku === sku)
    if (found) return found
  }
  return undefined
}

export const getProductsPage = cache(
  async (page: number): Promise<ProductsPage> => {
    const currentPage = normalizePage(page)
    const endpoint = `products/?page=${currentPage}`

    const data = await apiGet<ProductsApiResponse>(endpoint, {
      revalidate: REVALIDATE_SECONDS,
      tags: ["products", `products-page-${currentPage}`],
      fallback: PRODUCTS_FALLBACKS[currentPage],
    })

    const totalCount = data.count ?? 0

    return {
      products: data.results.map(toProduct),
      page: currentPage,
      pageSize: PRODUCTS_PAGE_SIZE,
      totalCount,
      totalPages: getTotalPages(totalCount, PRODUCTS_PAGE_SIZE),
    }
  },
)

export const getProductBySku = cache(
  async (sku: string): Promise<ProductDetail | null> => {
    const normalizedSku = sku.trim()
    if (!normalizedSku) return null

    const fallbackProduct = findProductInFallbacks(normalizedSku)

    try {
      const data = await apiGet<ProductApi>(`products/${normalizedSku}`, {
        revalidate: REVALIDATE_SECONDS,
        tags: ["products", `product-${normalizedSku}`],
        ...(fallbackProduct ? { fallback: fallbackProduct } : {}),
      })

      return toProductDetail(data)
    } catch {
      return fallbackProduct ? toProductDetail(fallbackProduct) : null
    }
  },
)
