import { formatPrice } from "@/lib/currencyFormat"
import type { Product } from "./types"

type ProductPriceProps = {
  price: Product["price"]
  salePrice: Product["salePrice"]
  className?: string
}

export function hasProductDiscount(
  price: Product["price"],
  salePrice: Product["salePrice"],
): salePrice is number {
  return salePrice != null && price != null && salePrice < price
}

export function getDisplayPrice(
  price: Product["price"],
  salePrice: Product["salePrice"],
): number | null {
  return salePrice ?? price
}

export default function ProductPrice({ price, salePrice, className }: ProductPriceProps) {
  const displayPrice = getDisplayPrice(price, salePrice)
  if (displayPrice == null) return null

  if (hasProductDiscount(price, salePrice) && price != null) {
    return (
      <p className={className}>
        <span className="mr-2 text-neutral-400 line-through">
          {formatPrice(price)}
        </span>
        <span>{formatPrice(salePrice)}</span>
      </p>
    )
  }

  return <p className={className}>{formatPrice(displayPrice)}</p>
}
