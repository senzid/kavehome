import type { Product, ProductApi, ProductDetail } from "./types"

export function toProduct(product: ProductApi): Product {
  return {
    sku: product.sku,
    title: product.title,
    description: product.description,
    image: product.mainImage?.url ?? null,
    price: product.price,
    salePrice: product.salePrice,
  }
}

export function toProductImages(product: ProductApi): string[] {
  const mainUrl = product.mainImage?.url ?? null
  const seen = new Set<string>()

  return [...(product.images ?? [])]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((image) => image.url)
    .filter((url) => {
      if (!url || url === mainUrl || seen.has(url)) return false
      seen.add(url)
      return true
    })
}

export function toProductDetail(product: ProductApi): ProductDetail {
  const collection = product.collection?.trim()

  return {
    ...toProduct(product),
    categories: product.categories ?? [],
    collection: collection ? collection : null,
    images: toProductImages(product),
  }
}

export function normalizePage(page: number): number {
  if (!Number.isFinite(page) || page < 1) return 1
  return Math.floor(page)
}

export function getTotalPages(totalCount: number, pageSize: number): number {
  return totalCount > 0 ? Math.ceil(totalCount / pageSize) : 0
}
