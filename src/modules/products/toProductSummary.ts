import type { Product } from "./types"

type ProductLike = Pick<
  Product,
  "sku" | "title" | "description" | "image" | "price" | "salePrice"
>

export function toProductSummary(product: ProductLike): Product {
  return {
    sku: product.sku,
    title: product.title,
    description: product.description,
    image: product.image,
    price: product.price,
    salePrice: product.salePrice,
  }
}
